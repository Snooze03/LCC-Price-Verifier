import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { authSchema } from '@/schemas/auth/auth-schema';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm({ className, ...props }) {
    // Login request
    const { login, isLoading, isError } = useAuth();

    // Form handler
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(authSchema),
    });

    // Submit handler
    const onSubmit = (formData) => {
        login({ email: formData.email, password: formData.password });
    };

    // IMPORTANT NOTE: Display zod errors and handle submit errors too

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...register('email')}
                                    id="email"
                                    type="email"
                                    placeholder="lcc@email.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                </div>
                                <Input
                                    {...register('password')}
                                    id="password"
                                    type="password"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    className="bg-blue-400 font-bold"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
