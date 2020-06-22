import React from 'react'
import { mount } from 'enzyme'

import CommentBox from 'components/CommentBox'
import Root from 'Root'

// we can get away with a shallow render here, but just as an example, we will use a full dom render

let wrapped

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  )
})
afterEach(() => wrapped.unmount())

it('has a text area and a button', () => {
  const textarea = wrapped.find('textarea')
  const button = wrapped.find('button')

  expect(textarea.length).toEqual(1)
  expect(button.length).toEqual(1)
})

// similate - merges into the javascript event object

describe('the text area', () => {
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', {
      target: { value: 'new comment' },
    })

    wrapped.update()
  })

  it('has a text area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment')
  })

  it("when form is submitted, the textarea's value clears", () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment')

    wrapped.find('form').simulate('submit')
    wrapped.update()
    expect(wrapped.find('textarea').prop('value')).toEqual('')
  })
})
