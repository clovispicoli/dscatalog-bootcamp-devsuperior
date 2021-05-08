import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';
import AuthCard from '../Card';
import './styles.scss';

type FormState = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Register = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    let location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/admin" } };

    const onSubmit = (data: FormState) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.replace(from);
            })
            .catch(() => {
                // setHasError(true);
            })
    }

    return (
        <AuthCard title="register">
             {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário ou senha inválidos!
                </div>
            )}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="margin-bottom-30">
                    <input
                        type="nome"
                        className={`form-control imput-base ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Nome"
                        name="nome"
                        ref={register({
                            required: "Campo obrigatório",
                            
                          })}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username.message}
                        </div>
                    )}
                </div>
                <div className="margin-bottom-30">
                    <input
                        type="sobrenome"
                        className={`form-control imput-base ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Sobrenome"
                        name="sobrenome"
                        ref={register({
                            required: "Campo obrigatório",
                          
                          })}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username.message}
                        </div>
                    )}
                </div>
                <div className="margin-bottom-30">
                    <input
                        type="email"
                        className={`form-control imput-base ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        name="username"
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email inválido"
                            }
                          })}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username.message}
                        </div>
                    )}
                </div>
                <div className="margin-bottom-30">
                    <input
                        type="password"
                        className={`form-control imput-base ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Digite aqui a Senha"
                        name="password"
                        ref={register({ required: "Campo obrigatório" })}
                    />
                   {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password.message}
                        </div>
                    )}
                </div>
                <div className="login-link-recover">
                
                    A sua senha deve ter pelo menos 8 caracteres e conter pelo menos uma número
             
                </div>
                <div className="margin-bottom-30">
                    <input
                        type="password"
                        className={`form-control imput-base ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Repita aqui a Senha"
                        name="password"
                        ref={register({ required: "Campo obrigatório" })}
                    />
                   {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password.message}
                        </div>
                    )}
                </div>
                <div className="base-form-actions">
                <Link to="/auth" className="btn btn-outline-danger border-radius-10 mr-3">
                        CANCELAR
                </Link>
                <Link to="/admin/users" className="btn btn-primary border-radius-10">
                        CADASTRAR
                </Link>
            </div>
            </form>
        </AuthCard>

    )
}

export default Register;