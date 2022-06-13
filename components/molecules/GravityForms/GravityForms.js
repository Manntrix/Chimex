import RichText from '@/components/organisms/Content/RichText'
import addEntry from '@/functions/gravityforms/addEntry'
import objToArr from '@/functions/objToArr'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './GravityForms.module.scss'

export default function GravityForms({ id, fields, button, confirmations }) {
  const [showConfirmation, setShowConfirmation] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const inputs = fields.reduce((sum, field) => {
      if (field.type === 'checkbox') {
        sum[field.id] = field.choices
          .map((choice, index) => {
            if (document.getElementById(`${field.id}_${index}`)?.checked)
              return {
                [`${field.id}_${index + 1}`]: document.getElementById(
                  `${field.id}_${index}`
                )?.checked
                  ? choice.value || ''
                  : '',
              }
          })
          .filter((choice) => choice)
      } else if (field.inputs?.length > 0) {
        field.inputs.map((input) => {
          sum[input.id] = document.getElementById(input.id)?.value || ''
        })
      } else {
        sum[field.id] = document.getElementById(field.id)?.value || ''
      }

      return sum
    }, {})

    const entry = await addEntry(id, inputs)
    if (entry.status === 201) {
      setShowConfirmation(true)
    }
  }

  const Field = ({ type, id, choices, inputs, isRequired }) => {
    isRequired = false
    switch (type) {
      case 'text':
        return (
          <input
            id={id}
            type='text'
            name={id}
            className={styles.input}
            required={isRequired}
          />
        )

      case 'textarea':
        return (
          <textarea
            id={id}
            name={id}
            className={styles.input}
            required={isRequired}
          />
        )

      case 'email':
        return (
          <input
            id={id}
            type='email'
            name={id}
            className={styles.input}
            required={isRequired}
          />
        )

      case 'phone':
        return (
          <input
            id={id}
            type='text'
            name={id}
            className={styles.input}
            required={isRequired}
          />
        )

      case 'date':
        return (
          <input
            id={id}
            type='date'
            name={id}
            className={styles.input}
            required={isRequired}
          />
        )

      case 'select':
        return (
          <select
            id={id}
            name={id}
            className={styles.input}
            required={isRequired}
          >
            {choices?.length > 0 &&
              choices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.text}
                </option>
              ))}
          </select>
        )

      case 'radio':
        return (
          <select
            id={id}
            name={id}
            className={styles.input}
            required={isRequired}
          >
            {choices?.length > 0 &&
              choices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.text}
                </option>
              ))}
          </select>
        )

      case 'checkbox':
        return (
          <div className='flex flex-col gap-2'>
            {choices?.length > 0 &&
              choices.map((choice, index) => (
                <label key={choice.value}>
                  <input
                    id={`${id}_${index}`}
                    name={`${id}_${index}`}
                    type='checkbox'
                    value={choice.value}
                    className='mr-2'
                  />
                  {choice.text}
                </label>
              ))}
          </div>
        )

      case 'name':
        return (
          <div className='flex flex-col md:flex-row gap-4'>
            {inputs?.length > 0 &&
              inputs.map((i) => {
                return (
                  <input
                    key={i.id}
                    id={i.id}
                    type='text'
                    name={i.id}
                    className={classNames(i.isHidden && 'hidden', styles.input)}
                    placeholder={i.label}
                  />
                )
              })}
          </div>
        )

      case 'address':
        return (
          <div className='grid md:grid-cols-3 gap-4'>
            {inputs?.length > 0 &&
              inputs.map((i) => {
                return (
                  <input
                    key={i.id}
                    id={i.id}
                    type='text'
                    name={i.id}
                    className={classNames(i.isHidden && 'hidden', styles.input)}
                    placeholder={i.label}
                  />
                )
              })}
          </div>
        )

      case 'fileupload':
        return (
          <input
            id={id}
            type='file'
            name={id}
            className={styles.input}
            required={isRequired}
          />
        )

      default:
        return (
          <input
            id={id}
            type={type}
            name={id}
            className={styles.input}
            required={isRequired}
          />
        )
    }
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className=''>
          {fields.length > 0 &&
            fields.map((field, index) => (
              <div key={index} className='my-5'>
                <label className={styles.label}>
                  {field.isRequired && (
                    <span className={styles.required}>*</span>
                  )}

                  {field.label}
                </label>

                <Field {...field} />

                <p className={styles.description}>{field.description}</p>
              </div>
            ))}
        </div>

        <div className='my-8'>
          <input type='submit' value={button.text} className={styles.submit} />
        </div>
      </form>

      {showConfirmation && (
        <RichText>{objToArr(confirmations)[0].message}</RichText>
      )}
    </div>
  )
}
