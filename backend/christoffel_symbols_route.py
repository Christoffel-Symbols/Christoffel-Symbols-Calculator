"""
christoffel_symbols_route.py

Runs the PyCSC python package and return API requests with the data.

GNU General Public License v3 (GNU GPLv3)

(c) 2024. All rights reserved                  

Dhananjhay Bansal disclaims any warranties, expressed, implied, or statutory, of any kind with rrespect to the software, 
including without limitation any warranty of merchantability or fitness for a particular purpose. Dhananjhay Bansal shall 
not be liable in any event for any damages, whether direct or indirect, special or general, consequential or incidental, 
arising from the use of the software. The name of the Dhananjhay Bansal may be used to endorse or promote products derived 
from this software without specific prior written permission.                  
                                    

This file is part of the Christoffel-Symbols project.              

Christoffel-Symbols is free software:  you can redistribute it and/or modify it under the terms of the GNU General Public 
License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.                   

Christoffel-Symbols is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.                        

You should have received a copy of the GNU General Public License along with Christoffel-Symbols project. 
If not, see<http://www.gnu.org/licenses/>.
"""

from pyCSC.pycsc import PyCSC
from pyCSC.metric_tensor import MetricTensor
from pyCSC.christoffel_symbols import ChristoffelSymbols
from pyCSC.riemann_tensor import RiemannTensor
from pyCSC.ricci_tensor import RicciTensor
from pyCSC.ricci_scalar import RicciScalar
from pyCSC.einstein_tensor import EinsteinTensor
from flask import jsonify, request
import sympy as sym

from utils import app, logger, log_tracebook, bad_request, server_error

@app.route("/christoffelsymbols", methods=["PUT"])
def put_christoffel_symbols_json():
    """
    Create a `PyCSC` object from the JSON request and return some attributes of the object as a JSON response.

    Attributes
    ----------
        PyCSCObj :: `PyCSC` object
          The `PyCSC` object created from the request parameters.

    Returns
    -------
        pycsc_json "" FLask JSON response
        Some attributes of the `PyCSC` object as a JSON response.
    """
    # Flask will raise exception 500 if any code raises an error
    #
    # Convert all inputs to floats
    #
    try:
        try:
            request_data = request.get_json()
            logger.info("PyCSC request_data: " + str(request_data))
            coordinates = request_data["coordinates"]
            for item in coordinates:
                coordinates[item] = str(coordinates[item])
            logger.info("Coordinates Information: " + str(coordinates))
            variable_parameters = request_data["variable_parameters"]
            for parameter in variable_parameters:
                variable_parameters[parameter] = str(variable_parameters[parameter])
            logger.info("Variable parameters: " + str(variable_parameters))

            matrix = str(request_data["metric_tensor"])
            logger.info("metric_tensor: " + str(matrix))

            calculate_options = str(request_data["calculate_options"])
            logger.info("calculate_options: " + str(calculate_options))

            simplify = str(request_data['simplify'])
            logger.info('Simplify: ' + str(simplify))

            # logging request data
            f = open("requestData.log", "a")
            f.write(str(request_data) + "\n")
            f.close()
            

        except Exception as e:
            log_tracebook(e)
            logger.error(
                "Inputs to initialize the `PyCSC` object " + "do not match required inputs."
            )

            return bad_request(
                "Inputs to initialize the `PyCSC` object " + "do not match required inputs."
            )
        
        coordinate_list = []

        for key in coordinates:
            if key != 'num_coordinates' and coordinates[key] != '':
                coordinate_list.append(coordinates[key])
        
        variable_dict = dict()

        for key in variable_parameters:
            if variable_parameters[key]:
                variable_dict[key] = variable_parameters[key]

        pycsc = PyCSC(
            coordinates = coordinate_list
        )

        metric_tensor = MetricTensor(matrix=matrix, variable_values=variable_dict,PyCSCObj=pycsc)

        christoffel_symbols = ChristoffelSymbols(PyCSCObj=pycsc, MetricTensorObj=metric_tensor)

        riemann_tensor = RiemannTensor(PyCSCObj=pycsc, MetricTensorObj=metric_tensor, ChristoffelSymbolsObj=christoffel_symbols)

        ricci_tensor = RicciTensor(MetricTensorObj=metric_tensor, RiemannTensorObj=riemann_tensor, PyCSCObj=pycsc)

        ricci_scalar = RicciScalar(PyCSCObj=pycsc, MetricTensorObj=metric_tensor, RicciTensorObj=ricci_tensor)

        einstein_tensor = EinsteinTensor(PyCSCObj=pycsc, MetricTensorObj=metric_tensor, RicciTensorObj=ricci_tensor, RicciScalarObj=ricci_scalar)

        if simplify == 'True':
            simplify = True
        else:
            simplify = False

        if 'Einstein Tensor' in calculate_options:
            print('einstein')
            #Calculate Christoffel Symbols
            christoffel_fk_dirty = christoffel_symbols.calculate(config='lll', show=False, simplify=simplify)
            christoffel_fk = christoffel_symbols.cleaner_christoffel_fk

            #List of matrices
            christoffel_sk = christoffel_symbols.calculate(config='ull', show=False, simplify=simplify)

            #Calculate Riemann Tensors
            riemann_fk_dirty = riemann_tensor.calculate(config='llll', show=False, simplify=simplify)
            riemann_fk = riemann_tensor.cleaner_riemann_fk

            if 'Riemann Tensor second kind' in calculate_options:     
                riemann_sk_dirty = riemann_tensor.calculate(config='ulll', show=False, simplify=simplify)
                riemann_sk = riemann_tensor.cleaner_riemann_sk

                rm_sk_dict = dict()
                for key,value in riemann_sk.items():
                    rm_sk_dict[key] = sym.latex(value)

            #Calculate Ricci Tensor
            ricci_fk = ricci_tensor.calculate(config='ll', show=False, simplify=simplify)

            #Calculate Ricci Scalar
            ricci_scalar_value = ricci_scalar.calculate(show=False, simplify=simplify)

            #Calculate Einstein Tensor
            einstein_tensor_fk = einstein_tensor.calculate(show=False, simplify=simplify)

            cs_sk_dict = dict()
            for index in range(len(christoffel_sk)):
                    cs_sk_dict[str(index)] = sym.latex(christoffel_sk[index])

            cs_fk_dict = dict()
            for key,value in christoffel_fk.items():
                cs_fk_dict[key] = sym.latex(value)

            rm_fk_dict = dict()
            for key,value in riemann_fk.items():
                rm_fk_dict[key] = sym.latex(value)

            return jsonify(
            metric_tensor = sym.latex(metric_tensor.tensor),
            christoffel_symbols_fk = cs_fk_dict if 'Christoffel Symbols first kind' in calculate_options else '',
            christoffel_symbols_sk = cs_sk_dict if 'Christoffel Symbols second kind' in calculate_options else '',
            riemann_tensor_fk = rm_fk_dict if 'Riemann Tensor first kind' in calculate_options else '',
            riemann_tensor_sk = rm_sk_dict if 'Riemann Tensor second kind' in calculate_options else '',
            ricci_tensor = sym.latex(ricci_fk) if 'Ricci Tensor' in calculate_options else '',
            ricci_scalar = sym.latex(ricci_scalar_value) if 'Ricci Scalar' in calculate_options else '',
            einstein_tensor = sym.latex(einstein_tensor_fk)
            ) 
        
        elif 'Ricci Scalar' in calculate_options:
            print('Ricci Scalar')
            #Calculate Christoffel Symbols
            christoffel_fk_dirty = christoffel_symbols.calculate(config='lll', show=False, simplify=simplify)
            christoffel_fk = christoffel_symbols.cleaner_christoffel_fk

            #List of matrices
            christoffel_sk = christoffel_symbols.calculate(config='ull', show=False, simplify=simplify)

            #Calculate Riemann Tensors
            riemann_fk_dirty = riemann_tensor.calculate(config='llll', show=False, simplify=simplify)
            riemann_fk = riemann_tensor.cleaner_riemann_fk

            if 'Riemann Tensor second kind' in calculate_options:
                riemann_sk_dirty = riemann_tensor.calculate(config='ulll', show=False, simplify=simplify)
                riemann_sk = riemann_tensor.cleaner_riemann_sk

                rm_sk_dict = dict()
                for key,value in riemann_sk.items():
                    rm_sk_dict[key] = sym.latex(value)

            #Calculate Ricci Tensor
            ricci_fk = ricci_tensor.calculate(config='ll', show=False, simplify=simplify)

            #Calculate Ricci Scalar
            ricci_scalar_value = ricci_scalar.calculate(show=False, simplify=simplify)

            cs_sk_dict = dict()
            for index in range(len(christoffel_sk)):
                    cs_sk_dict[str(index)] = sym.latex(christoffel_sk[index])

            cs_fk_dict = dict()
            for key,value in christoffel_fk.items():
                cs_fk_dict[key] = sym.latex(value)

            rm_fk_dict = dict()
            for key,value in riemann_fk.items():
                rm_fk_dict[key] = sym.latex(value)

            return jsonify(
            metric_tensor = sym.latex(metric_tensor.tensor),
            christoffel_symbols_fk = cs_fk_dict if 'Christoffel Symbols first kind' in calculate_options else '',
            christoffel_symbols_sk = cs_sk_dict if 'Christoffel Symbols second kind' in calculate_options else '',
            riemann_tensor_fk = rm_fk_dict if 'Riemann Tensor first kind' in calculate_options else '',
            riemann_tensor_sk = rm_sk_dict if 'Riemann Tensor second kind' in calculate_options else '',
            ricci_tensor = sym.latex(ricci_fk) if 'Ricci Tensor' in calculate_options else '',
            ricci_scalar = sym.latex(ricci_scalar_value),
            einstein_tensor = ''
            ) 
        
        elif 'Ricci Tensor' in calculate_options:
            print('Ricci Tensor')
            #Calculate Christoffel Symbols
            christoffel_fk_dirty = christoffel_symbols.calculate(config='lll', show=False, simplify=simplify)
            christoffel_fk = christoffel_symbols.cleaner_christoffel_fk

            #List of matrices
            christoffel_sk = christoffel_symbols.calculate(config='ull', show=False, simplify=simplify)

            #Calculate Riemann Tensors
            riemann_fk_dirty = riemann_tensor.calculate(config='llll', show=False, simplify=simplify)
            riemann_fk = riemann_tensor.cleaner_riemann_fk

            if 'Riemann Tensor second kind' in calculate_options:
                riemann_sk_dirty = riemann_tensor.calculate(config='ulll', show=False, simplify=simplify)
                riemann_sk = riemann_tensor.cleaner_riemann_sk

                rm_sk_dict = dict()
                for key,value in riemann_sk.items():
                    rm_sk_dict[key] = sym.latex(value)

            #Calculate Ricci Tensor
            ricci_fk = ricci_tensor.calculate(config='ll', show=False, simplify=simplify)

            cs_sk_dict = dict()
            for index in range(len(christoffel_sk)):
                    cs_sk_dict[str(index)] = sym.latex(christoffel_sk[index])

            cs_fk_dict = dict()
            for key,value in christoffel_fk.items():
                cs_fk_dict[key] = sym.latex(value)

            rm_fk_dict = dict()
            for key,value in riemann_fk.items():
                rm_fk_dict[key] = sym.latex(value)

            return jsonify(
            metric_tensor = sym.latex(metric_tensor.tensor),
            christoffel_symbols_fk = cs_fk_dict if 'Christoffel Symbols first kind' in calculate_options else '',
            christoffel_symbols_sk = cs_sk_dict if 'Christoffel Symbols second kind' in calculate_options else '',
            riemann_tensor_fk = rm_fk_dict if 'Riemann Tensor first kind' in calculate_options else '',
            riemann_tensor_sk = rm_sk_dict if 'Riemann Tensor second kind' in calculate_options else '',
            ricci_tensor = sym.latex(ricci_fk),
            ricci_scalar = '',
            einstein_tensor = ''
            ) 
        
        elif 'Riemann Tensor second kind' in calculate_options or 'Riemann Tensor first kind' in calculate_options:
            print('Riemann')
            #Calculate Christoffel Symbols
            christoffel_fk_dirty = christoffel_symbols.calculate(config='lll', show=False, simplify=simplify)
            christoffel_fk = christoffel_symbols.cleaner_christoffel_fk

            #List of matrices
            christoffel_sk = christoffel_symbols.calculate(config='ull', show=False, simplify=simplify)

            #Calculate Riemann Tensors
            riemann_fk_dirty = riemann_tensor.calculate(config='llll', show=False, simplify=simplify)
            riemann_fk = riemann_tensor.cleaner_riemann_fk

            if 'Riemann Tensor second kind' in calculate_options:                    
                riemann_sk_dirty = riemann_tensor.calculate(config='ulll', show=False, simplify=simplify)
                riemann_sk = riemann_tensor.cleaner_riemann_sk

                rm_sk_dict = dict()
                for key,value in riemann_sk.items():
                    rm_sk_dict[key] = sym.latex(value)

            cs_sk_dict = dict()
            for index in range(len(christoffel_sk)):
                    cs_sk_dict[str(index)] = sym.latex(christoffel_sk[index])

            cs_fk_dict = dict()
            for key,value in christoffel_fk.items():
                cs_fk_dict[key] = sym.latex(value)

            rm_fk_dict = dict()
            for key,value in riemann_fk.items():
                rm_fk_dict[key] = sym.latex(value)


            return jsonify(
            metric_tensor = sym.latex(metric_tensor.tensor),
            christoffel_symbols_fk = cs_fk_dict if 'Christoffel Symbols first kind' in calculate_options else '',
            christoffel_symbols_sk = cs_sk_dict if 'Christoffel Symbols second kind' in calculate_options else '',
            riemann_tensor_fk = rm_fk_dict if 'Riemann Tensor first kind' in calculate_options else '',
            riemann_tensor_sk = rm_sk_dict if 'Riemann Tensor second kind' in calculate_options else '',
            ricci_tensor = '',
            ricci_scalar = '',
            einstein_tensor = ''
            ) 
        
        else:
            print('Christoffel')
            #Calculate Christoffel Symbols
            if 'Christoffel Symbols first kind' in calculate_options:        
                christoffel_fk_dirty = christoffel_symbols.calculate(config='lll', show=False, simplify=simplify)

                christoffel_fk = christoffel_symbols.cleaner_christoffel_fk

                cs_fk_dict = dict()
                for key,value in christoffel_fk.items():
                    cs_fk_dict[key] = sym.latex(value)

            if 'Christoffel Symbols second kind' in calculate_options:
                #List of matrices
                christoffel_sk = christoffel_symbols.calculate(config='ull', show=False, simplify=simplify)

                cs_sk_dict = dict()
                for index in range(len(christoffel_sk)):
                        cs_sk_dict[str(index)] = sym.latex(christoffel_sk[index])

            return jsonify(
            metric_tensor = sym.latex(metric_tensor.tensor),
            christoffel_symbols_fk = cs_fk_dict if 'Christoffel Symbols first kind' in calculate_options else '',
            christoffel_symbols_sk =  cs_sk_dict if 'Christoffel Symbols second kind' in calculate_options else '',
            riemann_tensor_fk = '',
            riemann_tensor_sk = '',
            ricci_tensor = '',
            ricci_scalar = '',
            einstein_tensor = ''
            ) 
    
    except Exception as e:
        log_tracebook(e)
        logger.error(
            "There was a problem initializing the `PyCSC` object and " + "returning some of its attributes in a JSON format."
        )
        return server_error(
            "There was a problem initializing the `PyCSC` object and " + "returning some of its attributes in a JSON format."
        )