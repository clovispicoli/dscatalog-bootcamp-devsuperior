import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'core/types/User';
import './styles.scss';

type Props = {
    user: User;
    onRemove: (userId: number) => void;
}

const Card = ({ user, onRemove }: Props) => {
    return (
        <div className="card-base user-card-admin">
            <div className="row">
                <div className="col-9 text-left ">
                    <h3 className="user-card-name-admin">
                        {user.firstName}
                    </h3>
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link
                        to={`/admin/users/${user.id}`}
                        type="button"
                        className="btn btn-outline-secondary btn-block border-radius-10 mb-3"
                    >
                            EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-block border-radius-10"
                        onClick={() => onRemove(user.id)}
                    >
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;