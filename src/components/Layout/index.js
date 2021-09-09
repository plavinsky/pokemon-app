import s from "./style.module.css";

const Layout = ({title="Layout", descr="Layout descr", urlBg, colorBg}) => {
    // const layoutStyle = {
    //     backgroundImage: urlBg,
    //     backgroundColor: colorBg
    // }
    
    return (
        <div className={s.root}>
            <div className={s.wrapper} style={{
                backgroundImage: `url("${urlBg}")`,
                backgroundColor: colorBg
            }}>
                <article>
                <div className={s.title}>
                    <h2 >{title}</h2>
                    <span className={s.separator}></span>
                </div>
                <div className={`${s.desc} ${s.full}`}>
                    <p>{descr}</p>
                </div>
                </article>
                
            </div>
        </div>
    )
}

export default Layout;