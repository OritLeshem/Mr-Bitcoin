// import { mount } from '@vue/test-utils'
// import TransferFunds from './cmps/transfer-funds'

// describe('TransferFunds', () => {
//   it('checks if input field is a number', () => {
//     const wrapper = mount(TransferFunds)
//     const input = wrapper.find('input')

//     // simulate user input
//     input.setValue('123')

//     // assert that the value is a number
//     expect(wrapper.vm.myNumber).toBe(123)
//   })
// })


const sum = (a, b) => a + b

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})