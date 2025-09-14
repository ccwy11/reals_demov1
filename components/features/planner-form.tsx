"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { generatePlan } from "@/server/ai";
import { URLSearchParams } from 'url';


// Zod schemas for validation
const DateTypeSchema = z.enum([
    "Outdoor", "Indoor", "Adventure", "Cultural", "Relaxation",
    "Exhibitions", "Music", "Creative", "Entertainment", "Sports",
    "Nightlife", "Nature", "Shopping"
]);

const FoodTypeSchema = z.enum([
    "Chinese", "Japanese", "Korean", "Malaysian", "Taiwanese",
    "Thai", "Vietnamese", "Italian", "Spanish", "Peruvian",
    "Fastfood", "Indian", "Vegan", "Mexican", "Others", "Buffet", "Hotpot"
]);

const TransportationSchema = z.enum(["Public Transportation", "Driving", ""]);

const LocationSchema = z.enum(["Hong Kong Island", "Kowloon", "New Territories"]);

const TimeSchema = z.string().regex(/^\d{1,2}:\d{2}\s?(a\.m\.|p\.m\.)$/i, "Invalid time format");

export const QuestionnaireStateSchema = z.object({
    date: z.date().optional(),
    dateType: z.array(DateTypeSchema),
    startTime: TimeSchema,
    endTime: TimeSchema,
    food: z.array(FoodTypeSchema),
    transportation: TransportationSchema,
    budget: z.array(z.number().min(0).max(5000)).min(1),
    intensity: z.array(z.number().min(0).max(100)).min(1),
    location: z.array(LocationSchema)
});

const URLParamsSchema = z.object({
    step: z.coerce.number().min(1).max(8).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    dateType: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    food: z.string().optional(),
    transportation: TransportationSchema.optional(),
    budget: z.coerce.number().min(0).max(5000).optional(),
    intensity: z.coerce.number().min(0).max(100).optional(),
    location: z.string().optional()
});

type QuestionnaireState = z.infer<typeof QuestionnaireStateSchema>;
type URLParams = z.infer<typeof URLParamsSchema>;

export default function QuestionnaireForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 8;

    const route = useRouter();

    const [month, setMonth] = useState(new Date(2023, 0)); // January 2023

    // Create validated default state
    const defaultAnswers: QuestionnaireState = QuestionnaireStateSchema.parse({
        date: undefined,
        dateType: [],
        startTime: "8:00 a.m.",
        endTime: "8:00 p.m.",
        food: [],
        transportation: "",
        budget: [2500],
        intensity: [50],
        location: []
    });

    // Initialize React Hook Form with Zod validation
    const {
        control,
        setValue,
        getValues,
        formState: { errors },
        trigger
    } = useForm<QuestionnaireState>({
        resolver: zodResolver(QuestionnaireStateSchema),
        defaultValues: defaultAnswers,
        mode: "onChange"
    });

    // Form values are now managed through individual Controllers

    // Load answers from URL on component mount with Zod validation
    useEffect(() => {
        
        try {
            if (searchParams instanceof URLSearchParams) {
                const rawParams = searchParams;

    const step = rawParams.get('step') ?? "1";
    const date = rawParams.get('date') ?? null;
    const dateType = rawParams.get('dateType');
    const startTime = rawParams.get('startTime');
    const endTime = rawParams.get('endTime');
    const food = rawParams.get('food');
    const transportation = rawParams.get('transportation');
    const budget = rawParams.get('budget');
    const intensity = rawParams.get('intensity');
    const location = rawParams.get('location');

                
            }
            // const rawParams = {
            //     step: searchParams.get('step')??"1",
            //     date: searchParams.get('date')??null,
            //     dateType: searchParams.get('dateType'),
            //     startTime: searchParams.get('startTime'),
            //     endTime: searchParams.get('endTime'),
            //     food: searchParams.get('food'),
            //     transportation: searchParams.get('transportation'),
            //     budget: searchParams.get('budget'),
            //     intensity: searchParams.get('intensity'),
            //     location: searchParams.get('location')
            // };

            // Validate URL parameters
            const validatedParams = URLParamsSchema.parse(searchParams);

            if (validatedParams.step) {
                setCurrentStep(validatedParams.step);
            }

            if (validatedParams.date) {
                const parsedDate = new Date(validatedParams.date);
                if (!isNaN(parsedDate.getTime())) {
                    setValue('date', parsedDate);
                }
            }

            if (validatedParams.dateType) {
                const dateTypes = validatedParams.dateType.split(',')
                    .filter(Boolean)
                    .filter(type => DateTypeSchema.safeParse(type).success);
                if (dateTypes.length > 0) {
                    setValue('dateType', dateTypes as z.infer<typeof DateTypeSchema>[]);
                }
            }

            if (validatedParams.startTime && TimeSchema.safeParse(validatedParams.startTime).success) {
                setValue('startTime', validatedParams.startTime);
            }

            if (validatedParams.endTime && TimeSchema.safeParse(validatedParams.endTime).success) {
                setValue('endTime', validatedParams.endTime);
            }

            if (validatedParams.food) {
                const foods = validatedParams.food.split(',')
                    .filter(Boolean)
                    .filter(food => FoodTypeSchema.safeParse(food).success);
                if (foods.length > 0) {
                    setValue('food', foods as z.infer<typeof FoodTypeSchema>[]);
                }
            }

            if (validatedParams.transportation && TransportationSchema.safeParse(validatedParams.transportation).success) {
                setValue('transportation', validatedParams.transportation);
            }

            if (validatedParams.budget !== undefined) {
                setValue('budget', [validatedParams.budget]);
            }

            if (validatedParams.intensity !== undefined) {
                setValue('intensity', [validatedParams.intensity]);
            }

            if (validatedParams.location) {
                const locations = validatedParams.location.split(',')
                    .filter(Boolean)
                    .filter(location => LocationSchema.safeParse(location).success);
                if (locations.length > 0) {
                    setValue('location', locations as z.infer<typeof LocationSchema>[]);
                }
            }
        } catch (error) {
            console.warn('Invalid URL parameters, using defaults:', error);
        }
    }, [setValue, searchParams]);

    // Update URL whenever form values change
    const updateUrl = (step?: number) => {
        try {
            const currentValues = getValues();
            const params = new URLSearchParams();
            const currentStepValue = step || currentStep;

            // Validate step
            if (currentStepValue >= 1 && currentStepValue <= totalSteps) {
                params.set('step', currentStepValue.toString());
            }

            if (currentValues.date) {
                params.set('date', currentValues.date.toISOString().split('T')[0]);
            }

            if (currentValues.dateType.length > 0) {
                params.set('dateType', currentValues.dateType.join(','));
            }

            if (currentValues.startTime !== "8:00 a.m.") {
                params.set('startTime', currentValues.startTime);
            }

            if (currentValues.endTime !== "8:00 p.m.") {
                params.set('endTime', currentValues.endTime);
            }

            if (currentValues.food.length > 0) {
                params.set('food', currentValues.food.join(','));
            }

            if (currentValues.transportation) {
                params.set('transportation', currentValues.transportation);
            }

            if (currentValues.budget[0] !== 2500) {
                params.set('budget', currentValues.budget[0].toString());
            }

            if (currentValues.intensity[0] !== 50) {
                params.set('intensity', currentValues.intensity[0].toString());
            }

            if (currentValues.location.length > 0) {
                params.set('location', currentValues.location.join(','));
            }
 window.history.replaceState({}, '', `/path/to/page?${params.toString()}`);
            // setSearchParams(params);
        } catch (error) {
            console.error('Failed to update URL:', error);
        }
    };

    // Update URL only when currentStep changes (not on every form change)
    
    useEffect(() => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
        updateUrl(); }, [currentStep]);

    // Debounced URL update to prevent excessive updates
    const updateUrlDebounced = () => {
        setTimeout(() => {
            updateUrl();
        }, 100);
    };

    const progressPercentage = (currentStep / totalSteps) * 100;

    const handleDecideForMe = async () => {
        const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true };

        if (currentStep === 1) {
            const randomDay = Math.floor(Math.random() * 31) + 1;
            const randomDate = new Date(2023, 0, randomDay);
            setValue('date', randomDate, setValueOptions);
            updateUrlDebounced();
        } else if (currentStep === 2) {
            // Set random time range
            const startTimes = ["7:00 a.m.", "8:00 a.m.", "9:00 a.m.", "10:00 a.m."];
            const endTimes = ["6:00 p.m.", "7:00 p.m.", "8:00 p.m.", "9:00 p.m.", "10:00 p.m."];
            const randomStart = startTimes[Math.floor(Math.random() * startTimes.length)];
            const randomEnd = endTimes[Math.floor(Math.random() * endTimes.length)];
            setValue('startTime', randomStart, setValueOptions);
            setValue('endTime', randomEnd, setValueOptions);
            updateUrlDebounced();
        } else if (currentStep === 3) {
            const dateTypes = DateTypeSchema.options;
            const randomType = dateTypes[Math.floor(Math.random() * dateTypes.length)];
            setValue('dateType', [randomType], setValueOptions);
            updateUrlDebounced();
        } else if (currentStep === 4) {
            const foods = FoodTypeSchema.options;
            const randomFood = foods[Math.floor(Math.random() * foods.length)];
            setValue('food', [randomFood], setValueOptions);
            updateUrlDebounced();
        } else if (currentStep === 5) {
            const transports = ["Public Transportation", "Driving"] as const;
            const randomTransport = transports[Math.floor(Math.random() * transports.length)];
            setValue('transportation', randomTransport, setValueOptions);
            updateUrlDebounced();
        } else if (currentStep === 6) {
            // Set random budget between 1000-4000
            const randomBudget = Math.floor(Math.random() * 3000) + 1000;
            setValue('budget', [randomBudget], setValueOptions);
            updateUrlDebounced();
        } else if (currentStep === 7) {
            // Set random intensity between 20-80
            const randomIntensity = Math.floor(Math.random() * 60) + 20;
            setValue('intensity', [randomIntensity], setValueOptions);
            updateUrlDebounced();
        } else if (currentStep === 8) {
            const locations = LocationSchema.options;
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            setValue('location', [randomLocation], setValueOptions);
            updateUrlDebounced();
        }
    };

    const handleNext = async () => {
        // Validate current step before proceeding
        const isValid = await trigger();
        if (!isValid && canProceed()) {
            console.warn('Form validation failed, but proceeding based on canProceed logic');
        }

        if (currentStep < totalSteps) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            updateUrl(nextStep);
        } else {
            // Generate and download JSON file when questionnaire is completed
            generateJsonFile();
            route.push("/perplex");
        }
    };



    const generateJsonFile = () => {
        try {
            // Validate current form values before generating JSON
            const currentValues = getValues();
            const validatedAnswers = QuestionnaireStateSchema.parse(currentValues);

            // Define JSON output schema
            const JsonOutputSchema = z.object({
                metadata: z.object({
                    completedAt: z.string().datetime(),
                    totalSteps: z.number(),
                    version: z.string(),
                    validation: z.object({
                        isValid: z.boolean(),
                        schema: z.string()
                    })
                }),
                responses: z.object({
                    step1_date: z.object({
                        question: z.string(),
                        answer: z.string().nullable(),
                        type: z.literal("date"),
                        isValid: z.boolean()
                    }),
                    step2_time: z.object({
                        question: z.string(),
                        answer: z.object({
                            startTime: z.string(),
                            endTime: z.string()
                        }),
                        type: z.literal("time_range"),
                        isValid: z.boolean()
                    }),
                    step3_date_type: z.object({
                        question: z.string(),
                        answer: z.array(z.string()),
                        type: z.literal("multiple_choice"),
                        isValid: z.boolean()
                    }),
                    step4_food: z.object({
                        question: z.string(),
                        answer: z.array(z.string()),
                        type: z.literal("multiple_choice"),
                        isValid: z.boolean()
                    }),
                    step5_transportation: z.object({
                        question: z.string(),
                        answer: z.string(),
                        type: z.literal("single_choice"),
                        isValid: z.boolean()
                    }),
                    step6_budget: z.object({
                        question: z.string(),
                        answer: z.number(),
                        type: z.literal("slider"),
                        range: z.string(),
                        isValid: z.boolean()
                    }),
                    step7_intensity: z.object({
                        question: z.string(),
                        answer: z.number(),
                        type: z.literal("slider"),
                        range: z.string(),
                        labels: z.array(z.string()),
                        isValid: z.boolean()
                    }),
                    step8_location: z.object({
                        question: z.string(),
                        answer: z.array(z.string()),
                        type: z.literal("multiple_choice"),
                        isValid: z.boolean()
                    })
                })
            });

            const questionnaireResults = {
                metadata: {
                    completedAt: new Date().toISOString(),
                    totalSteps: totalSteps,
                    version: "1.0",
                    validation: {
                        isValid: true,
                        schema: "QuestionnaireStateSchema"
                    }
                },
                responses: {
                    step1_date: {
                        question: "When are you planning the date for?",
                        answer: validatedAnswers.date ? validatedAnswers.date.toISOString().split('T')[0] : null,
                        type: "date" as const,
                        isValid: validatedAnswers.date !== undefined
                    },
                    step2_time: {
                        question: "What time of day would you prefer for the date?",
                        answer: {
                            startTime: validatedAnswers.startTime,
                            endTime: validatedAnswers.endTime
                        },
                        type: "time_range" as const,
                        isValid: TimeSchema.safeParse(validatedAnswers.startTime).success &&
                            TimeSchema.safeParse(validatedAnswers.endTime).success
                    },
                    step3_date_type: {
                        question: "What kind of date would you like to plan?",
                        answer: validatedAnswers.dateType,
                        type: "multiple_choice" as const,
                        isValid: validatedAnswers.dateType.length > 0
                    },
                    step4_food: {
                        question: "I would like to eat...",
                        answer: validatedAnswers.food,
                        type: "multiple_choice" as const,
                        isValid: validatedAnswers.food.length > 0
                    },
                    step5_transportation: {
                        question: "How would you like to get around?",
                        answer: validatedAnswers.transportation,
                        type: "single_choice" as const,
                        isValid: validatedAnswers.transportation !== ""
                    },
                    step6_budget: {
                        question: "What is your budget for the date? (HKD per person)",
                        answer: validatedAnswers.budget[0],
                        type: "slider" as const,
                        range: "0-5000",
                        isValid: validatedAnswers.budget[0] >= 0 && validatedAnswers.budget[0] <= 5000
                    },
                    step7_intensity: {
                        question: "How intense would you like the date to be?",
                        answer: validatedAnswers.intensity[0],
                        type: "slider" as const,
                        range: "0-100",
                        labels: ["Chill", "Intense"],
                        isValid: validatedAnswers.intensity[0] >= 0 && validatedAnswers.intensity[0] <= 100
                    },
                    step8_location: {
                        question: "Do you have a preferred location for the date?",
                        answer: validatedAnswers.location,
                        type: "multiple_choice" as const,
                        isValid: validatedAnswers.location.length > 0
                    }
                }
            };

            // Validate the final JSON structure
            const validatedJson = JsonOutputSchema.parse(questionnaireResults);

            // Create and download JSON file
            const jsonString = JSON.stringify(validatedJson, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `date-planner-questionnaire-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to generate JSON file:', error);
            alert('Error generating JSON file. Please check your answers and try again.');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            updateUrl(prevStep);
        }
    };

    const toggleSelection = (array: string[], value: string) => {
        if (array.includes(value)) {
            return array.filter(item => item !== value);
        } else {
            return [...array, value];
        }
    };

    const canProceed = () => {
        const currentValues = getValues();
        switch (currentStep) {
            case 1: return !!currentValues.date;
            case 2: return true; // Time can always proceed
            case 3: return currentValues.dateType.length > 0;
            case 4: return currentValues.food.length > 0;
            case 5: return !!currentValues.transportation;
            case 6: return true; // Budget slider can always proceed
            case 7: return true; // Intensity slider can always proceed
            case 8: return currentValues.location.length > 0;
            default: return false;
        }
    };

    const renderQuestion = () => {
        
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                When are you planning the date for?
                            </h1>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-6 sm:mb-8 shadow-sm mx-2 sm:mx-0">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base sm:text-lg font-medium text-gray-900">January 2023</h2>
                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            updateUrlDebounced();
                                        }}
                                        month={month}
                                        onMonthChange={setMonth}
                                        className="w-full"
                                        classNames={{
                                            day_selected: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600",
                                            day_today: "bg-gray-100 text-gray-900",
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                What time of day would you prefer for the date?
                            </h1>
                        </div>
                        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 px-2 sm:px-0">
                            <div className="space-y-2">
                                <label className="text-base sm:text-lg font-medium text-gray-900">Start:</label>
                                <Controller
                                    name="startTime"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                updateUrlDebounced();
                                            }}
                                            className="text-center text-base sm:text-lg py-3 sm:py-4 border-gray-300 rounded-full touch-manipulation"
                                        />
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-base sm:text-lg font-medium text-gray-900">End:</label>
                                <Controller
                                    name="endTime"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                updateUrlDebounced();
                                            }}
                                            className="text-center text-base sm:text-lg py-3 sm:py-4 border-gray-300 rounded-full touch-manipulation"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 3:
                const dateTypes = [
                    ["Outdoor", "Indoor", "Adventure"],
                    ["Cultural", "Relaxation"],
                    ["Exhibitions", "Music", "Creative"],
                    ["Entertainment", "Sports"],
                    ["Nightlife", "Nature", "Shopping"]
                ];
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                What kind of date would you like to plan?
                            </h1>
                        </div>
                        <div className="space-y-3 mb-6 sm:mb-8 px-2 sm:px-0">
                            {dateTypes.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                                    {row.map((type) => (
                                        <Controller
                                            key={type}
                                            name="dateType"
                                            control={control}
                                            render={({ field }) => (
                                                <Button
                                                    onClick={() => {
                                                        const newValue = toggleSelection(field.value, type);
                                                        field.onChange(newValue);
                                                        updateUrlDebounced();
                                                    }}
                                                    className={cn(
                                                        "rounded-full px-4 sm:px-6 py-2 sm:py-2 text-sm font-medium transition-colors touch-manipulation min-h-[44px] sm:min-h-auto",
                                                        // @ts-expect-error : type error
                                                        field.value.includes(type) && []
                                                            ? "bg-red-500 text-white hover:bg-red-600"
                                                            : "bg-white border border-red-500 text-red-500 hover:bg-red-50"
                                                    )}
                                                >
                                                    {type}
                                                </Button>
                                            )}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 4:
                const foodTypes = [
                    ["Chinese", "Japanese", "Korean"],
                    ["Malaysian", "Taiwanese"],
                    ["Thai", "Vietnamese", "Italian"],
                    ["Spanish", "Peruvian"],
                    ["Fastfood", "Indian", "Vegan"],
                    ["Mexican", "Others"],
                    ["Buffet", "Hotpot", "Vegan"]
                ];
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                I would like to eat...
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm sm:text-base">(you can choose more than one)</p>
                        </div>
                        <div className="space-y-3 mb-6 sm:mb-8 px-2 sm:px-0">
                            {foodTypes.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                                    {row.map((food) => (
                                        <Controller
                                            key={food}
                                            name="food"
                                            control={control}
                                            render={({ field }) => (
                                                <Button
                                                    onClick={() => {
                                                        const newValue = toggleSelection(field.value??[], food);
                                                        field.onChange(newValue);
                                                        updateUrlDebounced();
                                                    }}
                                                    className={cn(
                                                        "rounded-full px-4 sm:px-6 py-2 sm:py-2 text-sm font-medium transition-colors touch-manipulation min-h-[44px] sm:min-h-auto",
                                                  // @ts-expect-error :  type error 
                                                        (field.value ?? []).includes(food)
                                                            ? "bg-red-500 text-white hover:bg-red-600"
                                                            : "bg-white border border-red-500 text-red-500 hover:bg-red-50"
                                                    )}
                                                >
                                                    {food}
                                                </Button>
                                            )}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 5:
                const transportOptions = ["Public Transportation", "Driving"];
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                How would you like to get around?
                            </h1>
                        </div>
                        <div className="space-y-4 mb-6 sm:mb-8 px-2 sm:px-0">
                            {transportOptions.map((option) => (
                                <Controller
                                    key={option}
                                    name="transportation"
                                    control={control}
                                    render={({ field }) => (
                                        <Button
                                            onClick={() => {
                                                field.onChange(option);
                                                updateUrlDebounced();
                                            }}
                                            variant="outline"
                                            className={cn(
                                                "w-full py-4 sm:py-6 text-base sm:text-lg rounded-full border-gray-300 touch-manipulation min-h-[56px] sm:min-h-auto",
                                                field.value === option
                                                    ? "border-red-500 text-red-500"
                                                    : "text-gray-600"
                                            )}
                                        >
                                            {option}
                                        </Button>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                What is your budget for the date? <span className="block sm:inline">(HKD per person)</span>
                            </h1>
                        </div>
                        <div className="mb-6 sm:mb-8 px-4 sm:px-4">
                            <div className="flex justify-between text-sm sm:text-base text-gray-600 mb-4 sm:mb-4">
                                <span>$0</span>
                                <span>$5000 or</span>
                            </div>
                            <Controller
                                name="budget"
                                control={control}
                                render={({ field }) => {
                                    // Ensure value is always an array and within valid range for budget
                                    let safeValue;
                                    if (Array.isArray(field.value)) {
                                        // Ensure budget values are within 0-5000 range
                                        safeValue = field.value.map(val => Math.max(0, Math.min(5000, val || 2500)));
                                    } else {
                                        const val = field.value || 2500;
                                        safeValue = [Math.max(0, Math.min(5000, val))];
                                    }

                                    return (
                                        <>
                                            <Slider
                                                value={safeValue}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    updateUrlDebounced();
                                                }}
                                                max={5000}
                                                step={100}
                                                className="w-full"
                                            />
                                            <div className="text-center mt-4 text-lg font-medium text-gray-900">
                                                ${safeValue[0]}
                                            </div>
                                        </>
                                    );
                                }}
                            />
                        </div>
                    </div>
                );

            case 7:
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                How intense would you like the date to be?
                            </h1>
                        </div>
                        <div className="mb-6 sm:mb-8 px-4 sm:px-4">
                            <div className="flex justify-between text-sm sm:text-base text-gray-600 mb-4 sm:mb-4">
                                <span>Chill</span>
                                <span>Intense</span>
                            </div>
                            <Controller
                                name="intensity"
                                control={control}
                                render={({ field }) => {
                                    // Ensure value is always an array and within valid range for intensity
                                    let safeValue;
                                    if (Array.isArray(field.value)) {
                                        // Ensure intensity values are within 0-100 range
                                        safeValue = field.value.map(val => Math.max(0, Math.min(100, val || 50)));
                                    } else {
                                        const val = field.value || 50;
                                        safeValue = [Math.max(0, Math.min(100, val))];
                                    }

                                    return (
                                        <Slider
                                            value={safeValue}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                updateUrlDebounced();
                                            }}
                                            max={100}
                                            step={1}
                                            className="w-full"
                                        />
                                    );
                                }}
                            />
                        </div>
                    </div>
                );

            case 8:
                const locations = ["Hong Kong Island", "Kowloon", "New Territories"];
                return (
                    <div>
                        <div className="text-center mb-6 sm:mb-8 px-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                                Do you have a preferred location for the date?
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm sm:text-base">(you can choose more than one)</p>
                        </div>
                        <div className="space-y-4 mb-6 sm:mb-8 px-2 sm:px-0">
                            {locations.map((location) => (
                                <Controller
                                    key={location}
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <Button
                                            onClick={() => {
                                                const newValue = toggleSelection(field.value, location);
                                                field.onChange(newValue);
                                                updateUrlDebounced();
                                            }}
                                            variant="outline"
                                            className={cn(
                                                "w-full py-4 sm:py-6 text-base sm:text-lg rounded-full border-gray-300 touch-manipulation min-h-[56px] sm:min-h-auto",
                                                    // @ts-expect-error :  type error 
                                                field.value.includes(location)
                                                    ? "border-red-500 text-red-500"
                                                    : "text-gray-600"
                                            )}
                                        >
                                            {location}
                                        </Button>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleNext();
    };


    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Generates a plan using the provided form values.
     *
     * @return {Promise<void>} A promise that resolves when the plan is generated. The response is logged to the console.
     */
    /*******  fc98ca5c-cd02-435a-9e8c-07fb0efcc013  *******/
    async function submitGenerate() {
        await generatePlan
        console.log("Plan generated successfully");

    }

    return (
        <form onSubmit={handleFormSubmit} noValidate className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="h-10 w-10 sm:h-8 sm:w-8 p-0 touch-manipulation"
                        aria-label="Go back to previous step"
                    >
                        <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
                    </Button>

                    <div className="text-sm sm:text-base text-gray-600 font-medium px-2">
                        <span className="hidden sm:inline">{currentStep}/{totalSteps} completed</span>
                        <span className="sm:hidden">{currentStep}/{totalSteps}</span>
                    </div>

                    <div className="w-10 sm:w-8" />
                </div>

                <div className="max-w-lg mx-auto mt-3 sm:mt-4 px-2 sm:px-0">
                    <Progress value={progressPercentage} className="h-2 sm:h-1" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-8">
                <div className="max-w-lg mx-auto w-full">
                    {renderQuestion()}

                    {/* Action Buttons */}
                    <div className="space-y-3 px-2 sm:px-0">
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleDecideForMe}
                                className="flex-1 py-3 sm:py-3 text-sm sm:text-base text-gray-700 border-gray-300 hover:bg-gray-50 touch-manipulation min-h-[48px]"
                            >
                                <span className="hidden sm:inline">Decide for Me</span>
                                <span className="sm:hidden">Decide</span>
                            </Button>
                            <Button
                                type="submit"
                                disabled={!canProceed()}
                                className={cn(
                                    "flex-1 py-3 sm:py-3 text-sm sm:text-base font-medium touch-manipulation min-h-[48px]",
                                    canProceed()
                                        ? "bg-red-500 hover:bg-red-600 text-white"
                                        : "bg-gray-300 cursor-not-allowed text-gray-500"
                                )}
                            >
                                {currentStep === totalSteps ? "Finish" : "Next Question"}
                            </Button>
                        </div>

                        {/* Export JSON Button */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={submitGenerate}
                            className="w-full py-2 sm:py-2 text-xs sm:text-sm text-gray-600 border-gray-200 hover:bg-gray-50 touch-manipulation min-h-[44px]"
                        >
                            Export Responses as JSON
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
