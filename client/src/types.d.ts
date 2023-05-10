
export type FromInputProps = { label: string } &
InputHTMLAttributes<HTMLInputElement>;

export type User = {
  id: number,
  name?: string,
  email: string,
  token: string
}
  