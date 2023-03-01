from marshmallow import Schema, fields

class GoalSchema(Schema):
  id = fields.Int(required=True)
  name = fields.Str()
  daily_goal_hours = fields.Int()
  description = fields.Str()

class GoalUserSchema(GoalSchema):
  user_id = fields.Email(required=True)
  