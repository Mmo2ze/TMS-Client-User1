export interface CurrentRoleInterface {
    data: {}
    roles: role[]
    token: string
}

export type role =
    | 'HaveStudentCode'
    | 'HaveParentCode'
    | 'Student'
    | 'Parent'
    | 'StudentRegister'
    | 'ParentRegister'
    | 'Unauthorized'
    | null
