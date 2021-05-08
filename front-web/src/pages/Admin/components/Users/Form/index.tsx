import React, { useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { User } from 'core/types/User';
import BaseForm from '../../BaseForm';

export type FormState = {
    firstName: string;
    users: User[];
}

type ParamsType = {
    userId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { userId } = useParams<ParamsType>();

    const isEditing = userId !== 'create';
    const formTitle = isEditing ? 'Editar usuário' : 'cadastrar um usuário';
    
    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/users/${userId}` })
                .then(response => {
                    setValue('name', response.data.firstName);
                    })
        }
    }, [userId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }

        makePrivateRequest({
            url: isEditing ? `/users/${userId}` : '/users',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
            })
            .then(() => {
                toast.info('Usuário salvo com sucesso!');
                history.push('/admin/users');
            })
            .catch(() => {
                toast.error('Erro ao salvar usuário!')
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm
                title={formTitle}
            >
                <div className="row">
                    <div className="col-9">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres' },
                                    maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres' }
                                })}
                                name="name"
                                type="text"
                                className="form-control imput-base"
                                placeholder="Nome do usuário"
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback d-block">
                                    {errors.firstName.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BaseForm> 
        </form>
    )
}

export default Form;