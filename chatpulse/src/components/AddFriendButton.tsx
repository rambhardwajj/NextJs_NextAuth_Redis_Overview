'use client'


import { FileX } from 'lucide-react'
import { FC } from 'react'
import { addFriendValidator } from '@/lib/validations/add-friend'
import axios, { AxiosError } from 'axios'
import {z} from 'zod'
import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { register } from 'module'
import { red } from '@mui/material/colors'

interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
	
	const [showSuccessState, setShowSuccessState] = useState<boolean>(false)

	const { register, handleSubmit, setError, formState: {errors} } = useForm<FormData>({
		resolver : zodResolver(addFriendValidator),
	})
	const addFriend = async (email: string)=>{
		try {
			const validEmail = addFriendValidator.parse({email})
			await axios.post('/api/friends/add' , {
				email: validEmail
			})

			setShowSuccessState(true);
		} catch (error) {
			if( error instanceof z.ZodError){
				setError( "email", {message: error.message })
				return
			}
			if( error instanceof AxiosError){
				setError( 'email', {message: error.response?.data})
				return 
			}
			
			setError('email', {message: 'Something went wrong'})
		}
	}
	const onSubmit = ( data: FormData  ) => {
		addFriend(data.email)
	}

  return <form onSubmit={handleSubmit(onSubmit)} >
	<label>
		Add Friend Email
	</label>
	<div style={{ justifyContent:'space-around', alignItems: 'center' }}>
		<input  {...register('email')}
		type='text' placeholder='you@gmail.com'>
		</input>
		<button  > Add </button>

		<p style={{ color : "red"}}> {errors.email?.message}</p>
		{showSuccessState ? (
			<p style={{ color : "green" }} > Friend req is sent  </p>
		): null }
	</div>
  </form>
}

export default AddFriendButton