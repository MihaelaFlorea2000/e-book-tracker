import * as yup from "yup";

export const readSchema = yup.object().shape({
    startDate: yup.date()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .required('Start Date is required'),
    endDate: yup.date()
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .required('End Date is required')
        .when('startDate', (startDate, schema) => startDate && schema.min(startDate, 'End date must be after start date')),
    notes: yup.string()
});