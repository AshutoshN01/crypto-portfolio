import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { register as registerUser } from '../../features/auth/authApi'
import { useAuthStore } from '../../store/useAuthStore'

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8)
})

type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    try {
      const session = await registerUser(data)
      setSession(session)
      navigate('/')
    } catch (error: any) {
      setError('root', { message: error.error?.message ?? 'Unable to create account' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Create account</h2>
            <p className="mt-2 text-sm text-muted">Start tracking your demo crypto portfolio.</p>
          </div>
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Username" {...register('username')} error={errors.username?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
          {errors.root?.message && <p className="text-sm text-red-300">{errors.root.message}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
          <p className="text-center text-sm text-muted">
            Already registered? <Link className="text-primary" to="/auth/login">Sign in</Link>
          </p>
        </form>
      </Card>
    </div>
  )
}
