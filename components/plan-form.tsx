"use client"

import { time } from "console"
import { useState } from "react"
import { id } from "zod/v4/locales"
import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"
import { Progress } from "./ui/progress"
import { Calendar } from "./ui/calendar"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { planSchema } from "@/db/schema"
import z from "zod"

//revisit the planSchema usage
type Inputs = z.infer<typeof planSchema>

const steps = [
    { id: "1", name: "time" },
    { id: "2", name: "food" },
    { id: "3", name: "transportation" },
    { id: "4", name: "budget" },
    { id: "5", name: "intensity" },
    { id: "6", name: "location" }
]
const foodTypes = [
    ["Chinese", "Japanese", "Korean"],
    ["Malaysian", "Taiwanese"],
    ["Thai", "Vietnamese", "Italian"],
    ["Spanish", "Peruvian"],
    ["Fastfood", "Indian", "Vegan"],
    ["Mexican", "Others"],
    ["Buffet", "Hotpot", "Vegan"]
];

const dateTypes = [
    ["Outdoor", "Indoor", "Adventure"],
    ["Cultural", "Relaxation"],
    ["Exhibitions", "Music", "Creative"],
    ["Entertainment", "Sports"],
    ["Nightlife", "Nature", "Shopping"]
];

export function PlanForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(planSchema)
    })


    //    const handleNext = () => {
    //         if (currentStep < totalSteps && canProceed()) {
    //             setCurrentStep(currentStep + 1);
    //         }
    //     };
    //reference for handleNext
    const next = () => {
        if (
            currentStep < steps.length - 1
        ) {
            setCurrentStep(currentStep + 1)
        }
    }
    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }



    //hardcode atm
    const totalSteps = 8
    const progressPercentage = (currentStep / totalSteps) * 100

    return (

        //navigation control

        <section className="min-h-screen bg-gray-50 flex flex-col">
            {/* //steps control */}
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        // onClick={handleBack}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="text-sm text-gray-600 font-medium">
                        {currentStep}/{totalSteps} completed
                    </div>

                    <div className="w-8" />
                </div>

                <div className="max-w-md mx-auto mt-3">
                    <Progress value={progressPercentage} className="h-1" />
                </div>
            </div>




            {/* //form content */}
            <div>
                <form className="space-y-4">
                    {currentStep === 0 && (
                        <Calendar
                            mode="single"
                            // selected={date}
                            // onSelect={setDate}
                            className="rounded-md border shadow-sm"
                            captionLayout="dropdown"
                        />

                    )}





                    {
                        currentStep === 1 && (
                            <div>
                                <h1>Step 1</h1>
                            </div>
                        )
                    }



                    {
                        currentStep === 2 && (
                            <div>
                                <h1>Step 2</h1>
                                <h2>or Complete</h2>
                            </div>
                        )
                    }


                </form>
            </div>








            {/* //navigate */}
            <div className="mt-8">
                <div className="flex">

                    {/* previous */}
                    <button
                        onClick={prev}
                        disabled={currentStep === 0}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    </button>

                    {/* next */}
                    <button>

                    </button>
                </div>

            </div>





        </section>


    )
}