import React, { useEffect, useState, useCallback } from 'react';
import { UsersResponse } from 'core/types/User';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import UserCardLoader from '../Loaders/UserCardLoader';

const List = () => {
    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    
    const getProducts = useCallback(() => {
      const params = {
        page: activePage,
        linesPerPage: 4,
        direction: 'DESC',
        orderBy: 'id'
      }
      setIsLoading(true);
      makeRequest({ url: '/users', params })
        .then(response => setUsersResponse(response.data))
        .finally(() => {
          setIsLoading(false);
        })
    }, [activePage]);
  
    useEffect(() => {
      getProducts();
    }, [getProducts]);
  
    const handleCreate = () => {
      history.push('/admin/users/create');
    }
  
    const onRemove = (userId: number) => {
      const confirm = window.confirm('Deseja realmente excluir este produto?');
  
      if (confirm) {
        makePrivateRequest({ url: `/users/${userId}`, method: 'DELETE' })
          .then(() => {
            toast.info('Produto removido com sucesso!');
            getProducts();
          })
          .catch(() => {
            toast.error('Erro ao remover produto!');
          })
      }
    }
  
    return (
      <div className="admin-products-list">
        <button className="btn btn-primary btn-lg" onClick={handleCreate}>
          ADICIONAR
        </button>
        <div className="admin-list-container">
          {isLoading ? <UserCardLoader /> : (
            usersResponse?.content.map(user => (
              <Card user={user} key={user.id} onRemove={onRemove} />
            ))
          )}
          {usersResponse && (
            <Pagination
              totalPages={usersResponse.totalPages}
              activePage={activePage}
              onChange={page => setActivePage(page)}
            />
          )}
        </div>
      </div>
    )
  }

export default List;