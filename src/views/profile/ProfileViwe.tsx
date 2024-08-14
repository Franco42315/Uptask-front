import ProfileForm from "../../components/profile/ProfileForm"
import { useAuth } from "../../hooks/useAuth"

export const ProfileViwe = () => {

  const { data, isLoading } = useAuth()
  console.log(data);
  
  if(isLoading) return 'Cargando...'
  if(data) return <ProfileForm data={data} />
}
