import { Container, Textarea } from '@chakra-ui/react'
import React from 'react'

export default function InputText() {
    let [value, setValue] = React.useState('')

    let handleInputChange = (e: { target: { value: any } }) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    return (
        <>
            <Container maxW={"3xl"}>
                <Textarea
                    value={value}
                    onChange={handleInputChange}
                    placeholder='Vnesi besedilo'
                    size='lg'
                />
            </Container>
        </>
    )
}