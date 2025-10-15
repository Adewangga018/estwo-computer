// resources/js/pages/admin/TestimonialsMonitoring.tsx

import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';
import { Trash, Edit } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

// Komponen untuk rating bintang
type StarRatingProps = {
    rating: number;
    setRating: (rating: number) => void;
};
const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`cursor-pointer text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};


// Komponen Modal untuk Form
type TestimonialFormModalProps = {
    testimonial: any;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    isEditing: boolean;
};
type TestimonialFormData = {
    _method: string;
    name: string;
    profession: string;
    stars: number;
    review: string;
    photo: File | null;
};
const TestimonialFormModal: React.FC<TestimonialFormModalProps> = ({ testimonial, isOpen, setIsOpen, isEditing }) => {
    const { data, setData, post, progress, errors, reset } = useForm<TestimonialFormData>({
        _method: isEditing ? 'PUT' : 'POST', // Inertia requires POST for file uploads
        name: testimonial?.name || '',
        profession: testimonial?.profession || '',
        stars: testimonial?.stars || 1,
        review: testimonial?.review || '',
        photo: null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = isEditing
            ? route('admin.testimonials.update', testimonial.id)
            : route('admin.testimonials.store');

        post(url, {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="profession">Profession</Label>
                        <Input
                            id="profession"
                            value={data.profession}
                            onChange={e => setData('profession', e.target.value)}
                        />
                        {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
                    </div>
                    <div>
                        <Label>Rating</Label>
                        <StarRating
                            rating={data.stars}
                            setRating={rating => setData('stars', rating)}
                        />
                         {errors.stars && <p className="text-red-500 text-sm mt-1">{errors.stars}</p>}
                    </div>
                    <div>
                        <Label htmlFor="review">Review</Label>
                        <Textarea
                            id="review"
                            value={data.review}
                            onChange={e => setData('review', e.target.value)}
                        />
                         {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review}</p>}
                    </div>
                    <div>
                        <Label htmlFor="photo">Photo (Optional)</Label>
                        {isEditing && testimonial?.photo && !data.photo && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Foto saat ini</p>
                                <img
                                    src={`/storage/${testimonial.photo}`}
                                    alt="Current testimonial photo"
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                            </div>
                        )}
                        <Input
                            id="photo"
                            type="file"
                            onChange={e => {
                                const files = (e.target as HTMLInputElement).files;
                                setData('photo', files && files[0] ? files[0] : null);
                            }}
                        />
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                    </div>
                    <Button type="submit">
                        {isEditing ? 'Update' : 'Create'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};


// Halaman utama
type TestimonialsMonitoringProps = {
    testimonials: any;
};
export default function TestimonialsMonitoring({ testimonials }: TestimonialsMonitoringProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

    const openAddModal = () => {
        setEditingTestimonial(null);
        setIsModalOpen(true);
    };

    const openEditModal = (testimonial: any) => {
        setEditingTestimonial(testimonial);
        setIsModalOpen(true);
    };

    return (
        <>
            <Head title="Rating Monitoring" />
            <div className="container mx-auto py-10">
                <Link href={route('admin.dashboard')}>
                    <Button variant="outline">Back to Admin Menu</Button>
                </Link>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Rating Monitoring</CardTitle>
                        <div className="flex space-x-2 py-2">
                            <Button onClick={openAddModal} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded">Add New Testimonial</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Photo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Profession</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {testimonials.data.map((testimonial: any) => (
                                    <TableRow key={testimonial.id}>
                                        <TableCell className="text-center">
                                            <img
                                                src={`/storage/${testimonial.photo}`}
                                                alt={testimonial.name}
                                                className="h-12 w-12 rounded-full object-cover mx-auto"
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">{testimonial.name}</TableCell>
                                        <TableCell className="text-center">{testimonial.profession}</TableCell>
                                        <TableCell className="text-center">{'★'.repeat(testimonial.stars)}</TableCell>
                                        <TableCell className="text-center space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => openEditModal(testimonial)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Link
                                                href={route('admin.testimonials.destroy', testimonial.id)}
                                                method="delete"
                                                as="button"
                                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 inline-flex items-center"
                                                onBefore={() => confirm('Are you sure you want to delete this item?')}
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* Pagination Links */}
                        <div className="mt-4 flex justify-center">
                            {testimonials.links.map((link: any, index: number) =>
                                link.url === null ? (
                                    <div
                                        key={index}
                                        className="px-4 py-2 mx-1 rounded text-gray-400 cursor-default"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-4 py-2 mx-1 rounded ${
                                            link.active
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ),
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            {(isModalOpen || editingTestimonial) && (
                <TestimonialFormModal
                    testimonial={editingTestimonial}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    isEditing={!!editingTestimonial}
                />
            )}
        </>
    );
}

TestimonialsMonitoring.layout = (page: React.ReactNode) => (
    <GuestLayout children={page} />
);
