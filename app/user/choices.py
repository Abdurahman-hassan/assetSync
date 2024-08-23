DEPARTMENT_CHOICES = [
    ('engineering', 'Engineering'),
    ('sales', 'Sales'),
    ('hr', 'HR'),
    ('business', 'Business'),
]

TEAM_CHOICES = {
    'engineering': [
        ('frontend', 'Frontend Team'),
        ('backend', 'Backend Team'),
        ('full_stack', 'Full Stack Team'),
        ('devops', 'DevOps Team'),
        ('data_science', 'Data Science Team'),
        ('qa', 'QA Team'),
        ('security', 'Security Team'),
        ('cloud', 'Cloud Team'),
        ('mobile', 'Mobile Development Team'),
        ('ui_ux', 'UI/UX Design Team'),
        ('solutions_architecture', 'Solutions Architecture Team'),
        ('sre', 'Site Reliability Engineering (SRE) Team'),
        ('it', 'IT Team'),
    ],
    'sales': [
        ('sales', 'Sales Team'),
        ('customer_support', 'Customer Support Team'),
    ],
    'hr': [
        ('hr', 'HR Team'),
        ('it_support', 'IT Support Team'),
    ],
    'business': [
        ('business_analysis', 'Business Analysis Team'),
        ('marketing', 'Marketing Team'),
        ('product_management', 'Product Management Team'),
        ('project_management', 'Project Management Team'),
    ],
}

ROLE_TEAM_MAP = {
    'frontend': ['frontend_developer', 'tech_lead'],
    'backend': ['backend_developer', 'tech_lead'],
    'full_stack': ['full_stack_developer'],
    'devops': ['devops_engineer'],
    'data_science': ['data_scientist'],
    'qa': ['qa_engineer'],
    'security': ['security_engineer'],
    'cloud': ['cloud_engineer'],
    'mobile': ['mobile_dev_ios', 'mobile_dev_android'],
    'ui_ux': ['ui_ux_designer'],
    'solutions_architecture': ['solution_architect'],
    'sre': ['sre'],
    'sales': ['sales_manager'],
    'customer_support': ['customer_support_manager', 'technical_support_engineer'],
    'hr': ['hr_manager'],
    'business_analysis': ['business_analyst'],
    'marketing': ['marketing_manager'],
    'product_management': ['product_manager'],
    'project_management': ['project_manager', 'scrum_master'],
    'it': ['it_manager', 'systems_administrator'],
}
