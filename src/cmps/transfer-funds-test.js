import { mount } from '@vue/test-utils'
import TransferFunds from './transfer-funds'

describe('TransferFunds', () => {
  it('checks if input field is a number', () => {
    const wrapper = mount(TransferFunds)
    const input = wrapper.find('input')

    // simulate user input
    input.setValue('123')

    // assert that the value is a number
    expect(wrapper.vm.myNumber).toBe(123)
  })
})
