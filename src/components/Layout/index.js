import s from "./style.module.css";


const Layout = ({title=null, descr=null, urlBg, colorBg}) => {
   
    return (
        <section className={s.root}>
            <div className={s.wrapper} style={{
                backgroundImage: `url("${urlBg}")`,
                backgroundColor: colorBg
            }}>
                <article>

                    <div className={s.title}>
                        {
                            title &&  <h3 >{title || 'Layout'}</h3>
                        }
                        <span className={s.separator}></span>
                    </div>
                    <div className={`${s.desc} ${s.full}`}>
                        <p>{descr || "Layout descr"}</p>
                    </div>
                </article>
                
            </div>
        </section>
    )
}

export default Layout;