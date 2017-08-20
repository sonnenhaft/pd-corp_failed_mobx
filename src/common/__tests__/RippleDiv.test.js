import React from 'react'
import { RippleDiv } from '../RippleDiv'
import renderer from 'react-test-renderer'

test('RippleDiv code should now changed', () => {
  const component = renderer.create(
    <RippleDiv page="http://www.facebook.com">Facebook</RippleDiv>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
