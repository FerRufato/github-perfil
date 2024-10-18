import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({nomeUsuario}) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState([]);

    useEffect(() => {
        setEstaCarregando(true)
        fetch(`http://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
                
            },3000);
          
        })
    }, [nomeUsuario]);


    return(
        < div className="container" > 
        {estaCarregando ? (
            <h1>Carregando...</h1>
        ) : (
        <ul className={styles.list}>
            {repos.map(repositorio => (
                <li className={styles.listItem} key={repositorio.id}> 
                    <div className={styles.litemName}>
                    <b>Nome:</b> 
                    {repositorio.name} 
                    </div>
                    <div className={styles.itemLanguagem}>
                            <b>linguagem:</b> 
                            {repositorio.language} 
                    </div>

                    <a className={styles.itemLink} target="_blank" href="https://github.com/FerRufato?tab=repositories">Visitar no GitHub</a>
                </li>

            ))}
           
        </ul>
        )}    
        </div>
    )
}

export default ReposList;
