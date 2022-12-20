import pool from '@/app/database'

interface IItem {
  id: number
  name: string
}

function getPrice(minValue: number, maxValue: number): number {
  const pirce = Math.floor(Math.random() * maxValue)

  if (pirce < minValue) {
    return getPrice(minValue, maxValue)
  }

  return pirce
}

pool.execute('SELECT * FROM room;').then((res) => {
  const data = res[0] as IItem[]
  for (const item of data) {
    const { id, name } = item
    const price = getPrice(
      name.includes('别墅') ? 1000 : 99,
      name.includes('别墅') ? 3000 : 300
    )
    const statement = 'UPDATE room SET price = ? WHERE id = ?;'
    pool.execute(statement, [price, id]).then(() => console.log(id))
  }
})
