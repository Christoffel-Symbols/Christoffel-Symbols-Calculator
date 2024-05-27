export const examplesData = [
  {
    value: "example-1",
    coordinates: {
      num_coordinates: 2,
      coordinate0: 'theta',
      coordinate1: 'phi',
      coordinate2: '',
      coordinate3: ''
    },
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['r**2', 0], [0, '(r**2)*sin(theta)**2']],
    onlyCS: 'option_1'
  },
  {
    value: "example-2",
    coordinates: {
      num_coordinates: 3,
      coordinate0: 'r',
      coordinate1: 'theta',
      coordinate2: 'phi',
      coordinate3: ''
    },
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['1', 0, 0], [0, '(r**2)', 0], [0, 0, '(r**2)*sin(theta)**2']],
    onlyCS: 'option_1'
  },
  {
    value: "example-3",
    coordinates: {
      num_coordinates: 4,
      coordinate0: 't',
      coordinate1: 'r',
      coordinate2: 'theta',
      coordinate3: 'phi'
    },
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-(1-r_s/r)', 0, 0, 0], [0, '(1-r_s/r)**(-1)', 0, 0], [0, 0, 'r**2', 0], [0, 0, 0, '(r**2)*sin(theta)**2']],
    onlyCS: 'option_1'
  },
  {
    value: "example-4",
    coordinates: {
      num_coordinates: 4,
      coordinate0: 't',
      coordinate1: 'r',
      coordinate2: 'theta',
      coordinate3: 'phi'
    },
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-1', 0, 0, 0], [0, '(a(t)**2)/(1-(k*r**2))', 0, 0], [0, 0, 'a(t)**2*(r**2)', 0], [0, 0, 0, '(a(t)**2)*(r**2)*sin(theta)**2']],
    onlyCS: 'option_1'
  },
  {
    value: "example-5",
    coordinates: {
      num_coordinates: 4,
      coordinate0: 't',
      coordinate1: 'r',
      coordinate2: 'theta',
      coordinate3: 'phi'
    },
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-(1 - (r_s/r) + (r_q**2)/r**2)', 0, 0, 0], [0, '(1 - (r_s/r) + (r_q**2)/r**2)**-1', 0, 0], [0, 0, '(r**2)', 0], [0, 0, 0, '(r**2)*sin(theta)**2']],
    onlyCS: 'option_1'
  },
  {
    value: "example-6",
    coordinates: {
      num_coordinates: 4,
      coordinate0: 't',
      coordinate1: 'r',
      coordinate2: 'theta',
      coordinate3: 'phi'
    },
    variable_parameters: {
      alpha: 'r**2 + a**2',
      delta: 'r**2 + (a**2)*(cos(theta)**2)',
      epsilon: 'r**2 + a**2 - r_s*r'
    },
    metric_tensor: [['-(1 - (r_s*r)/delta)', 0, 0, '-(r_s*r*a*sin(theta)**2)/delta'], [0, 'delta/epsilon', 0, 0], [0, 0, 'delta', 0], ['-(r_s*a*r*sin(theta)**2)/delta', 0, 0, '(alpha + (r_s*r*(a**2)*sin(theta)**2)/delta)*sin(theta)**2']],
    onlyCS: 'option_1'
  },
  {
    value: "example-7",
    coordinates: {
      num_coordinates: 4,
      coordinate0: 't',
      coordinate1: 'r',
      coordinate2: 'theta',
      coordinate3: 'phi'
    },
    variable_parameters: {
      alpha: '-(G*M)/r',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-(1 + (2*alpha)/(c**2))', 0, 0, 0], [0, '1- (2*alpha)/(c**2)', 0, 0], [0, 0, '(1 - (2*alpha)/c**2)*(r**2)', 0], [0, 0, 0, '(1-(2*alpha)/(c**2))*(r**2)*(sin(theta)**2)']],
    onlyCS: 'option_1'
  },
  {
    value: "example-8",
    coordinates: {
      num_coordinates: 4,
      coordinate0: 't',
      coordinate1: 'r',
      coordinate2: 'theta',
      coordinate3: 'phi'
    },
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['rho(t)', 0, 0, 0], [0, '((-k*r**2+ 1)*P(t))/a(t)**2', 0, 0], [0, 0, 'P(t)/(r**2*a(t)**2)', 0], [0, 0, 0, 'P(t)/(r**2*a(t)**2*sin(theta)**2)']],
    onlyCS: 'option_1'
  },
];