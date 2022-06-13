import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Button.module.scss'
import Image from '../Image'

export default function Button({
  attributes,
  className,
  disabled,
  onClick,
  size,
  style,
  tag,
  type,
  href,
  urlExternal,
  icon,
  children,
}) {
  const buttonClassNames = cn(
    className,
    styles.button,
    disabled && styles.disabled,
    styles[size],
    styles[type]
  )

  if (href) {
    return urlExternal || href.includes('recommends') ? (
      <a
        href={href}
        className={buttonClassNames}
        style={style}
        target='_blank'
        rel='noreferrer'
        {...attributes}
      >
        <span className={styles.text}>{children}</span>

        {icon && (
          <Image
            src={icon}
            width={16}
            height={16}
            alt='Arrow'
            className={styles.icon}
          />
        )}
      </a>
    ) : (
      <NextLink href={href}>
        <a className={buttonClassNames} style={style} {...attributes}>
          <span className={styles.text}>{children}</span>

          {icon && (
            <Image
              src={icon}
              width={16}
              height={16}
              alt='Arrow'
              className={styles.icon}
            />
          )}
        </a>
      </NextLink>
    )
  } else {
    return React.createElement(
      `${tag}`,
      {
        className: buttonClassNames,
        onClick,
        ...attributes,
        disabled,
        style,
      },
      <span className={styles.text}>{children}</span>
    )
  }
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'white',
    'custom',
  ]),
  attributes: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  urlExternal: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  style: PropTypes.object,
  tag: PropTypes.string,
  icon: PropTypes.string,
}

Button.defaultProps = {
  disabled: false,
  size: 'md',
  type: 'primary',
  tag: 'button',
  urlExternal: false,
}
