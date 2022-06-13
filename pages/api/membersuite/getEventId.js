async function anonymousToken() {
  const res = await fetch(
    `${process.env.MEMBERSUITE_API_URL}/anonymoustoken/33409`,
    {
      method: 'GET',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.text()
  }
}

export default async function handler(req, res) {
  const { name } = req.query

  const token = await anonymousToken()
  if (!token) {
    return res.status(500).send()
  }

  const myHeaders = new Headers()
  myHeaders.append('Authorization', token)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const data = await fetch(
    `https://rest.membersuite.com/events/v1/events/33409?page=1&pageSize=10&msql=Select ID From Event Where Name = '${name}'`,
    requestOptions
  )
  const json = await data.json()

  if (data.status !== 200) {
    return res.status(500).send()
  } else {
    return res.status(200).send(json)
  }
}
