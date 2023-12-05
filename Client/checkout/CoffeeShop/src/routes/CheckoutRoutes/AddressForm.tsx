import React, { ChangeEvent } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

type AddressFormProps = {
  onFormTypeSelect: (formTypeSelect: string) => void
  onFormAddressValue: (addressValue: string) => void
  onFormNoteValue: (NoteValue: string) => void
}

export default function AddressForm(props: AddressFormProps) {
  const { onFormTypeSelect, onFormAddressValue, onFormNoteValue } = props

  const [formType, setFormType] = React.useState('here')
  const [addressValue, setAddressValue] = React.useState('')
  const [noteValue, setNoteValue] = React.useState('')

  const handleFormTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(event.target.value)
    onFormTypeSelect(event.target.value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressValue = e.target.value
    setAddressValue(addressValue)
    onFormAddressValue(addressValue)
    console.log(onFormAddressValue)
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noteValue = e.target.value
    setNoteValue(noteValue)
    onFormNoteValue(noteValue)
    console.log(onFormNoteValue)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tóm Tắt Đơn Hàng{' '}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Hình Thức
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleFormTypeChange}
            >
              <FormControlLabel
                value="here"
                control={<Radio />}
                label="Uống tại quán"
                checked={formType === 'here'}
              />
              <FormControlLabel
                value="ship"
                control={<Radio />}
                label="Ship tận nhà"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address"
            label="Địa chỉ"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            disabled={formType === 'here'}
            value={addressValue}
            onChange={handleAddressChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
