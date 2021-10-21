import setLocalStorage from './saveToLocal'

describe('setLocalStorage', () => {
  it('should save data to local storage', () => {
    const spyLocalStorage = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'setItem'
    )
    setLocalStorage('user:', 'Mareike')

    expect(spyLocalStorage).toHaveBeenCalledTimes(1)
    expect(spyLocalStorage).toHaveBeenCalledWith('user:', '"Mareike"')
  })
})
