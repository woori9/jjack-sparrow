import React from 'react';
import renderer from 'react-test-renderer';
import UserProfileScreen from '../screens/UserProfileScreen';

describe('<UserProfileScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<UserProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
