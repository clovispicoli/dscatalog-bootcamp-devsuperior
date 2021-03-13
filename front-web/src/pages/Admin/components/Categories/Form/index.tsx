import React, { useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Product';
import BaseForm from '../../BaseForm';

export type FormState = {
    name: string;
    categories: Category[];
}

type ParamsType = {
    categoryId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { categoryId } = useParams<ParamsType>();

    const isEditing = categoryId !== 'create';
    const formTitle = isEditing ? 'Editar categoria' : 'cadastrar uma categoria';
    
    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    })
        }
    }, [categoryId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }

        makePrivateRequest({
            url: isEditing ? `/categories/${categoryId}` : '/categories',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
            })
            .then(() => {
                toast.info('Categoria salva com sucesso!');
                history.push('/admin/categories');
            })
            .catch(() => {
                toast.error('Erro ao salvar categoria!')
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
                                placeholder="Nome da categoria"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
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