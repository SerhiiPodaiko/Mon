import { FC } from 'react'
import { Collapse } from 'react-collapse'
import { useMediaQuery } from 'react-responsive'

import styles from '../Faq.module.scss'

import ToggleArrowSVG from '@assets/Icons/arrows/down-white.svg'
import ToggleArrowMobileSVG from '@assets/Icons/arrows/down-white-mobile.svg'

type AccordionProps = {
  type?: string
  index: number
  toggle: () => void
  title: string
  open: boolean
  description: string
  descriptionArray: any
}

const Accordion: FC<AccordionProps> = ({
  toggle,
  description,
  descriptionArray,
  title,
  open,
  type
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <div
      className={`${open ? styles.faq__accordionItemActive : ''} ${styles.faq__accordionItem}`}
      onClick={toggle}
    >
      <div className={styles.faq__accordionContent}>
        <div className={styles.faq__accordionContentWrapper}>
          <h4 className={styles.faq__accordionTitle}>{title}</h4>
          <div
            className={`${open && styles.faq__accordionCollapseActive} ${
              styles.faq__accordionCollapse
            }`}
          >
            <Collapse isOpened={open}>
              {type ? (
                descriptionArray && (
                  <ul className={styles.faq__accordionList}>
                    {descriptionArray.map((desc: string) => (
                      <li key={desc} className={styles.faq__accordionListItem}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <span>{description}</span>
              )}
            </Collapse>
          </div>
        </div>
        {isMobile ? (
          <ToggleArrowMobileSVG className={open ? styles.faq__accordionArrow : ''} />
        ) : (
          <ToggleArrowSVG className={open ? styles.faq__accordionArrow : ''} />
        )}
      </div>
    </div>
  )
}

export default Accordion
