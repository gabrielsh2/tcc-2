import { USER_DEFAULT_ROUTE, USER_TYPE } from '@constants'
import { useSession } from '@providers'
import { Redirect } from 'expo-router'

export default function UserScreen() {
  const {
    userData: { userType, userId },
  } = useSession()

  return (
    <Redirect
      href={{
        pathname: USER_DEFAULT_ROUTE[userType],
        params: { id: userId },
      }}
    />
  )
}
