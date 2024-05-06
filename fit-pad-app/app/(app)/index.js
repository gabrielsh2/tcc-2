import { USER_DEFAULT_ROUTE } from '@constants'
import { useSession } from '@providers'
import { Redirect } from 'expo-router'

export default function UserScreen() {
  const {
    userData: { userType },
  } = useSession()

  return <Redirect href={USER_DEFAULT_ROUTE[userType]} />
}
