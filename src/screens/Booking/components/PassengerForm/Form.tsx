import {useFormik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {t} from '@translations';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@store/store';
import {buy} from '@modules/ticket';
import {View, Text, TouchableOpacity} from 'react-native';
import {InputField} from '@components';
import styles from './Form.styles';

interface FormProps {
  flightId: string;
}
/* 
Primary passenger form should be implemented with the following fields:
- Name field : required : Done
- Surname field : required : Done
- Passport or ID number : required : Done

*/
/*
Fields should have basic validation - all fields should be required : Done
Passport or ID number should be validated with length of exact 9 characters : Done
*/
const Form = ({flightId}: FormProps) => {
  const initialValues = {
    name: '',
    surname: '',
    passport: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(`${t.form.validations.required}`),
    surname: Yup.string().required(`${t.form.validations.required}`),
    passport: Yup.string()
      .max(9, `${t.form.validations.passportTooLong}`)
      .min(9, `${t.form.validations.passportTooShort}`)
      .required(`${t.form.validations.required}`),
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = () => {
    /* if ticket is buyed with success close modal*/
    dispatch(buy(flightId));
  };

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const onPress = () => {
    handleSubmit();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t.myBooking.title}</Text>
        <InputField
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          placeholder={t.form.fields.namePlaceholder}
          label={t.form.fields.name}
          mode={'outlined'}
          style={styles.textInput}
          error={errors.name}
          touched={touched.name}
        />
        <InputField
          onChangeText={handleChange('surname')}
          onBlur={handleBlur('surname')}
          value={values.surname}
          placeholder={t.form.fields.surnamePlaceholder}
          label={t.form.fields.surname}
          mode={'outlined'}
          style={styles.textInput}
          error={errors.surname}
          touched={touched.surname}
        />
        <InputField
          onChangeText={handleChange('passport')}
          onBlur={handleBlur('passport')}
          value={values.passport}
          placeholder={t.form.fields.passportPlaceholder}
          label={t.form.fields.passport}
          mode={'outlined'}
          style={styles.textInput}
          blurOnSubmit
          error={errors.passport}
          touched={touched.passport}
        />
        <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
          <Text style={styles.detailsButtonText}>{t.myBooking.continue}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;
