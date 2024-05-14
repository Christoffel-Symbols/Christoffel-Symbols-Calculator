from pyCSC.pyCSC import PyCSC
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
            num_coordinates = int(request_data["num_coordinates"])
            logger.info("Number of Dimension: " + str(num_coordinates))
            variable_parameters = request_data["variable_parameters"]
            for parameter in variable_parameters:
                variable_parameters[parameter] = str(variable_parameters[parameter])
            logger.info("Variable parameters: " + str(variable_parameters))
            reserve_parameters = request_data["reserve_parameters"]
            for parameter in reserve_parameters:
                reserve_parameters[parameter] = str(reserve_parameters[parameter])
            logger.info("Reserve parameters: " + str(reserve_parameters))
            metric_tensor = str(request_data["metric_tensor"])
            logger.info("metric_tensor: " + str(metric_tensor))
            onlyCS = str(request_data["onlyCS"])
            logger.info("onlyCS: " + str(onlyCS))



        except Exception as e:
            log_tracebook(e)
            logger.error(
                "Inputs to initialize the `PyCSC` object " + "do not match required inputs."
            )

            return bad_request(
                "Inputs to initialize the `PyCSC` object " + "do not match required inputs."
            )
        
        PyCSCObj = PyCSC(
            num_coordinates = num_coordinates
        )

        cs_sk_dict = dict()
        cs_fk_dict = dict()
        riemann_dict = dict()
        variable_dict = dict()

        for key in variable_parameters:
            if variable_parameters[key]:
                variable_dict[key] = variable_parameters[key]
                

        print(variable_dict)

        PyCSCObj.metric_tensor(matrix=metric_tensor, scale_factor=eval(reserve_parameters['a']), pressure=eval(reserve_parameters['p']), density=eval(reserve_parameters['P']), variable_values=variable_dict) #self.metric

        PyCSCObj.calculate_christoffel_symbol(show_symbols=False) #self.christoffel_sk

        for index in range(num_coordinates):
            cs_sk_dict[str(index)] = sym.latex(sym.simplify(PyCSCObj.christoffel_sk[index]))

        PyCSCObj.calculate_christoffel_symbol_fk(show_symbols=False)

        for key in PyCSCObj.christoffel_fk:
            ans = PyCSCObj.christoffel_fk[key]
            if ans != 0:
                cs_fk_dict[key] = sym.latex(PyCSCObj.christoffel_fk[key])


        if onlyCS == "option_2":

            PyCSCObj.calculate_riemann_tensor(show_tensor=False) #self.riemann_dict

            PyCSCObj.calculate_ricci_tensor(show_tensor=False) # self.ricci_tensor

            PyCSCObj.calculate_ricci_scalar(show_scalar=False) # self.ricci_scalar

            einstein_tensor = PyCSCObj.calculate_einstein_tensor(show_tensor=False)


            for key in PyCSCObj.riemann_dict:
                ans = PyCSCObj.riemann_dict[key]
                if ans != 0:
                    riemann_dict[key] = sym.latex(PyCSCObj.riemann_dict[key])


        if onlyCS == "option_2":
            return jsonify(
            metric_tensor = sym.latex(PyCSCObj.metric),
            christoffel_symbols = cs_sk_dict,
            christoffel_symbols_fk = cs_fk_dict,
            riemann_tensor = riemann_dict,
            ricci_tensor = sym.latex(PyCSCObj.ricci_tensor),
            ricci_scalar = sym.latex(PyCSCObj.ricci_scalar),
            einstein_tensor = sym.latex(einstein_tensor)
        ) 
        else:
            return jsonify(
            metric_tensor = sym.latex(PyCSCObj.metric),
            christoffel_symbols = cs_sk_dict,
            christoffel_symbols_fk = cs_fk_dict,
            riemann_tensor = {},
            ricci_tensor = "",
            ricci_scalar = "",
            einstein_tensor = ""
            )
    
    except Exception as e:
        log_tracebook(e)
        logger.error(
            "There was a problem initializing the `PyCSC` object and " + "returning some of its attributes in a JSON format."
        )
        return server_error(
            "There was a problem initializing the `PyCSC` object and " + "returning some of its attributes in a JSON format."
        )