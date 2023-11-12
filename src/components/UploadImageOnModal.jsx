import React, { useState } from 'react';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Image } from 'lucide-react';
import { Input } from './ui/input';
import clsx from 'clsx';

function UploadImageOnModal({ form, currentImage }) {
	const [previewImage, setPreviewImage] = useState(currentImage ?? null);

	return (
		<FormField
			control={form.control}
			name="image"
			render={({ field: { name, value, disabled, onChange } }) => (
				<FormItem className="w-full h-fit flex flex-col items-center justify-center">
					<FormLabel className="flex flex-col gap-4 justify-center items-center">
						<div className="flex flex-col items-center justify-center h-fit">
							<div
								className={clsx(
									'flex-grow flex flex-col gap-2 items-center relative w-40 h-32 rounded-lg mb-4 bg-gray-100  cursor-pointer',
									{
										'shadow-lg border': previewImage,
									}
								)}
								style={{
									backgroundImage: `url(${previewImage})`,
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
								}}
							>
								{!previewImage && (
									<>
										<p className="text-gray-500 font-medium w-fit">
											Sube imagen
										</p>
										<div className="w-32 h-28 flex items-center justify-center rounded-xl border-4 border-dotted border-gray-500 cursor-pointer">
											<Image className="text-gray-500 w-12 h-12" />
										</div>
									</>
								)}
							</div>
						</div>
					</FormLabel>
					<FormControl>
						<Input
							type="file"
							className="bg-gray-200 hidden"
							onChange={(e) => {
								if (e.target.files) {
									if (e.target.files[0]) {
										onChange(e.target.files[0]);
										const imageUrl = URL.createObjectURL(e.target.files[0]);
										setPreviewImage(imageUrl);
									} else {
										onChange(null);
										setPreviewImage(null);
									}
								}
							}}
							name={name}
							value={value?.filename}
							disabled={disabled}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default UploadImageOnModal;
