export const examplesData = [
     {
    value: "example-1",
    num_coordinates: 2,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['r**2',0], [0,'(r**2)*sin(x)**2']],
    onlyCS : 'option_1'
    },
    {
    value: "example-2",
    num_coordinates: 3,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['1',0,0], [0,'(x**2)',0],[0,0,'(x**2)*sin(y)**2']],
    onlyCS: 'option_1'
    },
    {
    value: "example-3",
    num_coordinates: 4,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-(1-r_s/x)',0,0,0], [0,'(1-r_s/x)**(-1)',0,0], [0,0,'x**2',0], [0,0,0,'(x**2)*sin(y)**2']],
    onlyCS: 'option_1'
    },
    {
    value: "example-4",
    num_coordinates: 4,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-1',0,0,0], [0,'(a(t)**2)/(1-(k*x**2))',0,0], [0,0,'a(t)**2*(x**2)',0], [0,0,0,'(a(t)**2)*(x**2)*sin(y)**2']],
    onlyCS: 'option_1'
    },
    {
    value: "example-5",
    num_coordinates: 4,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-(1 - (r_s/x) + (r_Q**2)/x**2)',0,0,0], [0,'(1 - (r_s/x) + (r_Q**2)/x**2)**-1',0,0], [0,0,'(x**2)',0], [0,0,0,'(x**2)*sin(y)**2']],
    onlyCS: 'option_1'
    },
    {
    value: "example-6",
    num_coordinates: 4,
    variable_parameters: {
      alpha: 'x**2 + a**2',
      delta: 'x**2 + (a**2)*(cos(y)**2)',
      epsilon: 'x**2 + a**2 - r_s*x'
    },
    metric_tensor: [['-(1 - (r_s*x)/delta)',0,0,'-(r_s*x*a*sin(y)**2)/delta'], [0,'delta/epsilon',0,0], [0,0,'delta',0], ['-(r_s*a*x*sin(y)**2)/delta',0,0,'(alpha + (r_s*x*(a**2)*sin(y)**2)/delta)*sin(y)**2']],
    onlyCS: 'option_1'
    },
    {
    value: "example-7",
    num_coordinates: 4,
    variable_parameters: {
      alpha: '-(G*M)/x',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['-(1 + (2*alpha)/(c**2))',0,0,0], [0,'1- (2*alpha)/(c**2)',0,0], [0,0,'(1 - (2*alpha)/c**2)*(x**2)',0], [0,0,0,'(1-(2*alpha)/(c**2))*(x**2)*(sin(y)**2)']],
    onlyCS: 'option_1'
    },
    {
    value: "example-8",
    num_coordinates: 4,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    metric_tensor: [['rho(t)',0,0,0], [0,'((-k*x**2+ 1)*P(t))/a(t)**2',0,0], [0,0,'P(t)/(x**2*a(t)**2)',0], [0,0,0,'P(t)/(x**2*a(t)**2*sin(y)**2)']],
    onlyCS: 'option_1'
    },
];