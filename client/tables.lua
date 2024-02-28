local tablesObjects = {}

local function SpawnTable(model, coords)
    local entity = CreateObject(model, coords.x, coords.y, coords.z, false, false, false)
    while not DoesEntityExist(entity) do Wait(50) end
    SetEntityHeading(entity, coords.w)
    FreezeEntityPosition(entity, true)
    SetEntityAsMissionEntity(entity, true, true)
    SetModelAsNoLongerNeeded(model)
    return entity
end

local function DeleteAllObjects()
    for i = 1, #tablesObjects, 1 do
        local table = tablesObjects[i]
        if DoesEntityExist(table) then
            DeleteEntity(table)
        end
    end
    tablesObjects = {}
end

for i = 1, #Config.tables, 1 do
    local tableData = Config.tables[i]
    local entity = SpawnTable(tableData.model, tableData.coords)
    table.insert(tablesObjects, entity)
end

AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then return end
    DeleteAllObjects()
end)
