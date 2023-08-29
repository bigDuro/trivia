import { render } from '@testing-library/react';
import WsUtils from './ws-utils';
describe('WsUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WsUtils />);
    expect(baseElement).toBeTruthy();
  });
});
