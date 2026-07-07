import styles from "./Statistics.module.css"
import { useEffect, useRef, useState } from "react"

export const Statistics = () => {
	const [clients, setClients] = useState(0)
	const [platos, setPlatos] = useState(0)
	const [years, setYears] = useState(0)
	const [ranking, setRanking] = useState(0)
	const [stores, setStores] = useState(0)
	const [visible, setVisible] = useState(false)

	const clientsObjetive = 300
	const platesObjetive = 100
	const yearsObjetive = 10
	const rankingObjetive = 10
	const storesObjetive = 10
	const ref = useRef(null)

	// Detectar cuando entra en pantalla
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setVisible(true)
				}
			}, { threshold: 0.5 } // 50% visible
		)

		if (ref.current) observer.observe(ref.current);

		return () => observer.disconnect()
	}, [])

	// Animación del contador
	useEffect(() => {
		if (!visible) return;

		let intervalClients = setInterval(() => {
			setVisible(true);
			setClients((prev) => {
				if (prev >= clientsObjetive) {
					clearInterval(intervalClients)
					return clientsObjetive
				}
				return prev + 1
			})
		}, 7)

		let intervalPlates = setInterval(() => {
			setVisible(true);
			setPlatos((prev) => {
				if (prev >= platesObjetive) {
					clearInterval(intervalPlates)
					return platesObjetive
				}
				return prev + 1
			})
		}, 22)

		let intervalYears = setInterval(() => {
			setVisible(true);
			setYears((prev) => {
				if (prev >= yearsObjetive) {
					clearInterval(intervalYears)
					return yearsObjetive
				}
				return prev + 1
			})
		}, 200)

		let intervalStores = setInterval(() => {
			setVisible(true);
			setStores((prev) => {
				if (prev >= storesObjetive) {
					clearInterval(intervalStores)
					return storesObjetive
				}
				return prev + 1
			})
		}, 200)

		let intervalRanking = setInterval(() => {
			setVisible(true);
			setRanking((prev) => {
				if (prev >= rankingObjetive) {
					clearInterval(intervalRanking)
					return rankingObjetive
				}
				return prev + 1
			})
		}, 200)


		return () => {
			clearInterval(intervalClients)
			clearInterval(intervalPlates)
			clearInterval(intervalYears)
			clearInterval(intervalRanking)
			clearInterval(storesObjetive)
		}

	}, [visible])



	return (
		<section className={styles.dates} ref={ref}>
			<div className={styles.datesTotal}>
				<h2 className={`${styles.title2} ${styles.datesTotalTitle}`}>Reseñas</h2>
				<p className={styles.datesTotalParagraph}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci nemo aut sequi aliquam labore architecto nisi consequuntur. Possimus quos fugiat vero laboriosam, rem repellendus veritatis voluptas temporibus, laborum velit aut.</p>

				<div className={styles.tips}>

					<article className={styles.circle}>
						<h2 className={styles.circleTitle2}>+{clients}</h2>
						<h3 className={styles.circleTitle3}>Clientes</h3>
					</article>

					<article className={styles.circle} >
						<h2 className={styles.circleTitle2}>+{platos}</h2>
						<h3 className={styles.circleTitle3}>Platos</h3>
					</article>

					<article className={styles.circle}>
						<h2 className={styles.circleTitle2}>+{years}</h2>
						<h3 className={styles.circleTitle3}>Años</h3>
					</article>

					<article className={styles.circle}>
						<h2 className={styles.circleTitle2}>+{stores}</h2>
						<h3 className={styles.circleTitle3}>Tiendas</h3>
					</article>

					<article className={styles.circle}>
						<h2 className={styles.circleTitle2}>#{ranking}</h2>
						<h3 className={styles.circleTitle3} >Top</h3>
					</article>
				</div>

			</div>
		</section>
	)
}

