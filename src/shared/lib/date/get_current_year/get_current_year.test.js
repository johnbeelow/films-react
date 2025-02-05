import { getCurrentYear } from '../utils/utils'

test('Возвращает текущий год', () => {
  const mockDate = new Date()
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

  const year = getCurrentYear()
  expect(year).toBe(2024)

  jest.restoreAllMocks()
})
