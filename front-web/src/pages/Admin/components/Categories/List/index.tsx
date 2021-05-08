import React, { useEffect, useState, useCallback } from 'react';
import { CategoriesResponse } from 'core/types/Category';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
// import ProductFilters from 'core/components/ProductFilters';
import Card from '../Card';
import CategoryCardLoader from '../Loaders/CategoryCardLoader';
// import Pagination from 'core/components/Pagination';

const List = () => {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage] = useState(0);
    // const [category, setCategory] = useState<Category>();
    // const [name, setName] = useState('');
    const history = useHistory();

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            // name,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makeRequest({ url: '/categories', params })
            .then(response => setCategoriesResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage])

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleCreate = () => {
        history.push('/admin/categories/create');
    }

    const onRemove = (categoryId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta categoria??');

        if (confirm) {
            makePrivateRequest({ url: `/categories/${categoryId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Categoria removida com sucesso!');
                    getCategories();
                })
                .catch(() => {
                    toast.error('Erro ao remover categoria!')
                })
        }
    }

    // const handleChangeName = (name: string) => {
    //     setActivePage(0);
    //     setName(name);
    // }

    // const handleChangeCategory = (category: Category) => {
    //     setActivePage(0);
    //     setCategory(category);
    // }

    // const clearFilters = () => {
    //     setActivePage(0);
    //     setCategory(undefined);
    //     setName('');
    // }

    return (
        <div className="admin-products-list">
        <div className="d-flex barra-pesquisa justify-content-between">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
        </button>
            {/* <ProductFilters
                category={category}
                handleChangeCategory={handleChangeCategory}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
            /> */}
        </div>
            <div className="admin-list-container">
                {isLoading ? <CategoryCardLoader /> : (
                    categoriesResponse?.content.map(category => (
                        <Card category={category} key={category.id} onRemove={onRemove} />
                    ))
                )}
                {/* {categoriesResponse && (
                    <Pagination
                        totalPages={categoriesResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )} */}
            </div>
        </div>
    )
}

export default List;