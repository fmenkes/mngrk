import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }));

it('renders without crashing', () => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
  require('../index'); // eslint-disable-line global-require
  expect(ReactDOM.render).toHaveBeenCalledWith(expect.anything(), div);
});
