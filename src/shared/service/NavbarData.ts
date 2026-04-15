interface SourceType {
  name: string
  label: string
  icon?: string
}

export const SourceFilters: SourceType[] = [
  {
    name: 'ALL',
    label: 'Accueil',
  },
  {
    name: 'GAMING',
    label: 'Gaming',
  },
  {
    name: 'TECH',
    label: 'Tech',
  },
  {
    name: 'CYBERSECURITY',
    label: 'Cybersecurity',
  },
]

export interface ProfileMenu {
  icon?: string
  label?: string
  action?: string
}

export const ProfileMenu: ProfileMenu[] = [
  {
    icon: 'bx bx-user',
    label: 'Mon profile',
    action: 'PROFILE',
  },
  {
    icon: 'bx bx-power-off',
    label: 'Déconnexion',
    action: 'LOGOUT',
  },
]