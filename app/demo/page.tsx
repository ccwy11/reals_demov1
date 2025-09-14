import React from 'react'
import QuestionnaireForm from '@/components/features/planner-form'
import { Suspense } from 'react'

export default function demoPage() {
    return (
        <div>
               <Suspense>
            <QuestionnaireForm />
              </Suspense>
        </div>
    )
}

