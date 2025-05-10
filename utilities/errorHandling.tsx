import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isErrorWithCode, errorCodes } from '@react-native-documents/picker'

export const handleError = (err: unknown) => {
    if (isErrorWithCode(err)) {
      switch (err.code) {
        case errorCodes.IN_PROGRESS:
          console.warn(
            'Attempted to present a picker, but a previous one was already presented.',
          )
          break
        case errorCodes.UNABLE_TO_OPEN_FILE_TYPE:
          console.warn('Unable to open selected file type')
          break
        case errorCodes.OPERATION_CANCELED:
          console.log('Cancelled.')
          break
        default:
          console.error(err)
      }
    } else {
      console.warn(err)
    }
  }

const styles = StyleSheet.create({

});