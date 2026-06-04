import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { login } from '../../features/auth/authApi'
import { useAuthStore } from '../../store/useAuthStore'

const schema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8)
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((state) => state.setSession)
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    try {
      const session = await login(data)
      setSession(session)
      navigate((location.state as { from?: string } | null)?.from ?? '/')
    } catch (error: any) {
      setError('root', { message: error.error?.message ?? 'Unable to sign in' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="mt-2 text-sm text-muted">Access your crypto portfolio workspace.</p>
          </div>
          <Input label="Email or username" {...register('identifier')} error={errors.identifier?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
          {errors.root?.message && <p className="text-sm text-red-300">{errors.root.message}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
          <p className="text-center text-sm text-muted">
            New here? <Link className="text-primary" to="/auth/register">Create account</Link>
          </p>
        </form>
      </Card>
    </div>
  )
}
