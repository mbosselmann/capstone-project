import getLocalStorage from './loadFromLocal'

describe('getLocalStorage', () => {
  it('should get data from local storage', () => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation(() => '"Mareike"')

    const actual = getLocalStorage()

    expect(actual).toEqual('Mareike')
  })
})
