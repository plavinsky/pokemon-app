import cn from "classnames";

import s from "./style.module.css";



const Layout = ({title=null, urlBg, colorBg, children }) => {

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
                    <div className={cn(s.desc, s.full)}>
                        {children}
                    </div>
                </article>
                
            </div>
        </section>
    )
}

export default Layout;