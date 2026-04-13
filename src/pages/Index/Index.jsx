import { Footer } from "../../layouts/Footer/Footer"
import styles from "./Index.module.css"

export const Index = () => {
  return (
    <main className="background">
      <section className={styles.corpus}>
        <div className={styles.corpusTxt}>
          <h1 className={styles.corpusTitle}>Resturante Grill</h1>
          <p className={styles.corpusParagraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque accusamus corrupti cumque eaque officiis dolor velit beatae minus, blanditiis in perferendis dolore aliquid error dolores aspernatur pariatur hic fuga qui.</p>
          <button className={styles.corpusButton}>Ordenar ahora</button>
        </div>
        <div className={styles.corpusImg}></div>
      </section>

      <section>
        <div className={styles.menu}>
          <h2 className={styles.menuTitle}>Platos clásicos</h2>
          <p className={styles.menuParagraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius veritatis mollitia dolores et esse aliquam, quo nesciunt, obcaecati aperiam tenetur quidem nihil dicta fugit vitae porro quia magnam explicabo! Sunt?</p>

          <div className={styles.platillos}>

            <div className={styles.platos}>
              <div className={styles.img1}></div>
              <h3 className={styles.platilloTitle}>Arros con pato </h3><br /><h3>$ 11.990</h3>
              <p className={styles.platosParagraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis fugiat dolor quisquam.</p>
            </div>

            <div className={styles.platos}>
              <div className={styles.img2}></div>
              <h3 className={styles.platilloTitle}>Arros con pato </h3><br /><h3>$ 11.990</h3>
              <p className={styles.platosParagraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis fugiat dolor quisquam.</p>
            </div>
            <div className={styles.platos}>
              <div className={styles.img3}></div>
              <h3 className={styles.platilloTitle}>Arros con pato </h3><br /><h3>$ 11.990</h3>
              <p className={styles.platosParagraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis fugiat dolor quisquam.</p>
            </div>
          </div>
        </div>

        <div className={styles.presentation}>
          <h2 className={styles.presentationTitle}>Carta ejecutiva</h2>

          <div className={styles.presentationInterno}>
            <div className={styles.imgPresentation}>
              <div className={`${styles.imgPlato} ${styles.uno}`}></div>
            </div>


            <div className={styles.txtPresentation}>
              <h2 className={styles.txtPresentationTitle}>Ceviche Mixto</h2><br />
              <h2 className={styles.txtPresentationTitle}>$ 50.000</h2>
              <p className={styles.txtPresentationParagraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, natus, alias quia eveniet nemo aliquam vitae expedita ex qui veniam asperiores dignissimos recusandae magnam? Animi numquam maxime rem optio qui!</p>
              <button className={styles.txtPresentationButton}>Ordenar pedido</button>

            </div>
          </div>

          <div className={styles.presentationInterno}>
            <div className={styles.imgPresentation}>
              <div className={`${styles.imgPlato} ${styles.dos}`}></div>
            </div>

            <div className={styles.txtPresentation}>
              <h2 className={styles.txtPresentationTitle}>Ceviche Mixto</h2><br />
              <h2 className={styles.txtPresentationTitle}>$ 50.000</h2>
              <p className={styles.txtPresentationParagraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, natus, alias quia eveniet nemo aliquam vitae expedita ex qui veniam asperiores dignissimos recusandae magnam? Animi numquam maxime rem optio qui!</p>
              <button className={styles.txtPresentationButton}>Ordenar pedido</button>

            </div>
          </div>
        </div>

        <div className={styles.dates}>
          <div className={styles.datesTotal}>
            <h1 className={styles.datesTotalTitle}>Reseñas</h1>
            <p className={styles.datesTotalParagraph}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci nemo aut sequi aliquam labore architecto nisi consequuntur. Possimus quos fugiat vero laboriosam, rem repellendus veritatis voluptas temporibus, laborum velit aut.</p>
            <div className={styles.tips}>
              <div className={styles.circle}>
                <h2 className={styles.circleTitle2}>5000</h2>
                <h3>Clientes</h3>
              </div>
              <div className={styles.circle}>
                <h2 className={styles.circleTitle2}>45</h2>
                <h3 className={styles.circleTitle3}>Platos</h3>
              </div>
              <div className={styles.circle}>
                <h2 className={styles.circleTitle2}>5</h2>
                <h3 className={styles.circleTitle3}>Años de trayecto</h3>
              </div>
              <div className={styles.circle}>
                <h2 className={styles.circleTitle2}>4</h2>
                <h3 className={styles.circleTitle3}>Top</h3>
                <h3 >Top</h3>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.finalTxt}>
          <p className={styles.finalTxtParagraph}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia repudiandae voluptatum, illo neque eveniet in asperiores pariatur quibusdam tempore deserunt a exercitationem. Ut alias numquam placeat. Eligendi doloremque omnis sapiente.</p>
          <h3 className={styles.finalTxtTitle} >Lorem ipsum dolore</h3>
        </div>

        <div className={styles.suscription}>
          <h2 className={styles.suscriptionTitle}>Suscribete</h2>
          <p className={styles.suscriptionParagraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque inventore quas dolores praesentium accusantium, velit corrupti quam ducimus dolore, maxime et magni vitae culpa nemo provident nobis numquam repudiandae. Modi!</p>
          <div className={styles.formText}>
            <input className={styles.formTextInput} type="text" />
            <button className={styles.formTextButton} >Enviar</button>
          </div>
        </div>
        
      </section>

      <Footer/>
    </main>
  )
}