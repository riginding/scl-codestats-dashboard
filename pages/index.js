import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {
  BarChart, Bar, YAxis, XAxis, LabelList, ResponsiveContainer
} from 'recharts';

const Index = (props) => (
      <BarChart
        width={1000}
        height={500}
        data={props.data}
        layout="vertical"
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis tickLine={false} hide={true} type="number"/>
        <YAxis tickLine={false} hide={true} type="category" dataKey="name" />
        <Bar dataKey="totalXP" fill="#82ca9d">
          <LabelList dataKey="name" position="insideLeft" />
          <LabelList dataKey="totalXP" position="insideRight" />
        </Bar>
      </BarChart>
)

Index.getInitialProps = async function() {
  const userNames = ['riginding', 'madfist', 'theanswer']
  const fetchData = await Promise.all(userNames.map(user => fetch(`https://codestats.net/api/users/${user}`)))
  let userStats = await Promise.all(fetchData.map((userData) => { 
    return userData.json()
  }))
  userStats = userStats.map(stat => {
    return {
      name: stat.user,
      totalXP: stat.total_xp
    }
  }).sort((apple, banana) => {
    return banana.totalXP - apple.totalXP
  })
   

  return {
    data: userStats
  }
}

export default Index